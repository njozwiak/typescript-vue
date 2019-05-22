import Vue from "vue";
import AddProjectComponent from "./components/IndicatorList.vue";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <div class="title">Bienvenue {{userName}}</div>
        <h1>Add Project</h1>
        <add-project-component :name="name"/>
        </div>
    `,
    data: { userName: "Nicolas" },
    components: {
        AddProjectComponent
    }
});