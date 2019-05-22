<template>
    <div>
        <div>
            <label>Nom de l'indicateur: </label>
            <input v-model="projectName" type="text"/>
            <button class="add-indicator-button" @click="addIndicator(projectName)">Ajouter</button>
        </div>

        <transition name="fade">
            <ul class="heroes" v-if="indicators && indicators.length">
                <li v-for="indicator in indicators">
                    <div>
                        <div>{{indicator.name}}</div>
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
        /*@Prop() indicator!: Indicator;*/
        editingIndicator!:Indicator;
        projectName:String = "";
        indicators: Indicator[] = [];

        addIndicator(name: string) {
            this.indicators.forEach(function (indicator){
                let project = new Project(indicator.name.substring(1,2).concat(name.substring(1, 3)), name);
                indicator.projects.push(project);
            });
            console.log(this.indicators);
            this.editingIndicator = this.cloneIt();
        }

        deleteIndicator(indicator: Indicator) {
            this.indicators.filter(item => item !== indicator);
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

<style>

</style>