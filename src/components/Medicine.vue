<template>
  <div class="container">
    <div class="row">
      <div class="col-md-5">
        <div class="card">
          <div class="card-header">
            {{titleForm}}
          </div>
          <div class="card-body">
            <form class="forms-sample">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name">Nombre</label>
                    <input type="text" class="form-control" v-model="name" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name">Presentación</label>
                    <input type="text" class="form-control" v-model="presentation" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name">Stock</label>
                    <input type="number" class="form-control" v-model="stock" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name">Fecha Expiración</label>
                    <input type="date" class="form-control" v-model="expirationDate" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name">Estado</label>
                    <select class="form-control" v-model="status">
                      <option value="Expirado">Expirado</option>
                      <option value="Disponible">Disponible</option>
                      <option value="nodisponible">No Disponible</option>
                    </select>
                  </div>
                </div>
              </div>
              <button type="button" v-if="!isEdit" class="btn btn-success m-2" @click="saveMedicine">Guardar</button>
              <button type="button" v-if="isEdit" class="btn btn-info m-2" @click="updateMedicine">Actualizar</button>
              <button class="btn btn-light">Cancel</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="card">
          <div class="card-header">Listado De Medicamentos</div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Presentación</th>
                  <th scope="col">Fecha Exp</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="mecine in medicines" :key="mecine.id">
                  <td>{{ mecine.name }}</td>
                  <td>{{ mecine.presentation }}</td>
                  <td>{{ mecine.expirationDate }}</td>
                  <td>
                    <span v-if="mecine.status == 'Disponible'" class="badge badge-success">{{ mecine.status }}</span>
                    <span v-else-if="mecine.status == 'nodisponible'" class="badge badge-danger">{{ mecine.status
                    }}</span>
                    <span v-else class="badge badge-warning">{{ mecine.status }}</span>
                  </td>
                  <td>{{ mecine.stock }}</td>
                  <td>
                    <button class="btn btn-danger m-2" @click="deleteMedicine(mecine.id)">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn btn-primary m-2" @click="editMedicine(mecine.id)"> <span
                        class="fas fa-edit"></span>
                    </button>
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
      name: '',
      stock: 0,
      expirationDate: '',
      status: '',
      presentation: '',
      idMedi: 0,
      isEdit: false,
      titleForm: 'Agregar Medicamento'
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
    saveMedicine() {
      var data = { name: this.name, presentation: this.presentation, expirationDate: this.expirationDate, stock: this.stock, status: this.status }
      axios.post('http://localhost:8080/api/medicines', data).then(() => {
      })
    },
    editMedicine(id) {
      this.isEdit = true;
      this.titleForm = 'Actualizar Medicamento';
      axios.get("http://localhost:8080/api/medicines/" + id).then((resp) => {
        console.log(resp);
        // this.medicines = resp.data;
        this.name = resp.data.name;
        this.stock = resp.data.stock;
        this.expirationDate = resp.data.expirationDate;
        this.presentation = resp.data.presentation;
        this.status = resp.data.status;
        this.idMedi = resp.data.id;
      });
    },
    updateMedicine() {
      var data = { name: this.name, presentation: this.presentation, expirationDate: this.expirationDate, stock: this.stock, status: this.status }
      axios.put('http://localhost:8080/api/medicines/' + this.idMedi, data).then(() => {
        this.getAll();
      })
      this.titleForm = 'Agregar Medicamento';
      this.resetInput();
    },
    deleteMedicine(id) {
      axios.delete("http://localhost:8080/api/medicines/" + id).then(() => {
        console.log("Eliminado correctamente");
        this.getAll();
      })
    },
    resetInput() {
      this.name = '';
      this.stock = 0;
      this.expirationDate = '';
      this.presentation = '';
      this.status = '';
    }
  },
};
</script>
<style scoped>
.card {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.card-header {
  background-color: rgb(0, 139, 97);
  color: white;
  font-weight: bold;
}

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
