<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12"></div>
      <div class="col-md-12 mt-4">
        <div class="card">
          <div class="card-header">Listado De Medicamentos</div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">presentation</th>
                  <th scope="col">expirationDate</th>
                  <th scope="col">status</th>
                  <th scope="col">stock</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="mecine in medicines" :key="mecine.id">
                  <td>{{ mecine.name }}</td>
                  <td>{{ mecine.presentation }}</td>
                  <td>{{ mecine.expirationDate }}</td>
                  <td>{{ mecine.status }}</td>
                  <td>{{ mecine.stock }}</td>
                  <td>
                    <button class="btn btn-danger" @click="deleteMedicine(mecine.id)">Eliminar</button>
                    <button class="btn btn-primary">Actualizar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Medicine",
  data() {
    return {
      medicines: [],
    };
  },

  mounted() {
    this.getAll();
  },
  methods: {
    getAll() {
      axios.get("http://localhost:8080/api/medicines").then((resp) => {
        console.log(resp);
        this.medicines = resp.data;
      });
    },

    deleteMedicine(id){
        axios.delete("http://localhost:8080/api/medicines/"+id).then(()=> {
            console.log("Eliminado correctamente");
            this.getAll();
        })
    }
  },
};
</script>
<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
