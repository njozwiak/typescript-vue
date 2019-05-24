<template>
    <div>
        <div>
            <label>Nom du projet : </label>
            <input v-model="projectName" type="text"/>
            <button class="add-project-button" @click="addProject(projectName)">Ajouter</button>
        </div>

        <transition name="fade">
            <ul class="project-list" v-if="indicators && indicators.length">
                <li v-for="project in indicators[0].projects">
                    <div>
                        <div>{{project.name}}</div>
                        <button class="destroy" @click="deleteProject(project)"></button>
                    </div>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import {Indicator} from "../Indicator";
    import * as data from '../../static/indicators.json';
    import {Project} from "../Project";

    @Component
    export default class IndicatorList extends Vue {
        editingIndicator!:Indicator;
        projectName:String = "";
        indicators: Indicator[] = [];

        addProject(name: string) {
            this.indicators.forEach(function (indicator){
                let generateId = indicator.name.substring(1, 2).concat(name.substring(1, 3));
                let project = new Project(generateId, name);
                indicator.projects.push(project);
            });

            this.editingIndicator = this.cloneIt();
        }

        deleteProject(project: Project) {
            this.indicators.forEach(function (indicator){
                indicator.projects.splice(indicator.projects.indexOf(project), 1);
            });
        }

        getIndicators() {
            return this.indicators;
        }

        created() {
            this.editingIndicator = this.cloneIt();
            let dataRead = JSON.parse(JSON.stringify(data));

            this.indicators = dataRead.default.indicators;

        }

        cloneIt() {
            return Object.assign({}, this.editingIndicator);
        }

    }
</script>