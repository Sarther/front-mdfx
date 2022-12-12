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
                    <input type="text" class="form-control" v-model="fullname" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="dni">DNI</label>
                    <input type="text" class="form-control" v-model="dni" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="address">Dirección</label>
                    <input type="dir" class="form-control" v-model="address" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="phone">Teléfono</label>
                    <input type="tel" class="form-control" v-model="phone" />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" v-model="email" />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="name">Especialidades</label>
                    <select class="form-control" v-model="specialities" multiple>
                      <option value="Alergologia">Alergología</option>
                      <option value="Anestesiologia">Anestesiología</option>
                      <option value="Cardiologia">Cardiología</option>
                      <option value="Endocrinologia">Endocrinología</option>
                      <option value="Odontologia">Odontología</option>
                      <option value="Estomatologia">Estomatología</option>
                      <option value="MedicinaGeneral">Medicina General</option>
                    </select>
                  </div>
                </div>
              </div>
              <button type="button" v-if="!isEdit" class="btn btn-success m-2" @click="saveDoctor">Guardar</button>
              <button type="button" v-if="isEdit" class="btn btn-info m-2" @click="updateDoctor">Actualizar</button>
              <button class="btn btn-light">Cancel</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="card">
          <div class="card-header">Listado De Medicos</div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Email</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Especialidades</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="doctor in doctors" :key="doctor.id">
                  <td>{{ doctor.fullname }}</td>
                  <td>{{ doctor.email }}</td>
                  <td>{{ doctor.phone }}</td>
                  <td>
                  <p v-for="s in doctor.specialities">
                    <span class="badge badge-info">{{s}}</span>
                  </p>
                  </td>
                  <td>
                    <button class="btn btn-danger m-2" @click="deleteDoctor(doctor.id)">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn btn-primary m-2" @click="editDoctor(doctor.id)"> <span
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
import toastr from "toastr";
export default {
  name: "Doctor",
  data() {
    return {
      doctors: [],
      fullname: '',
      address: '',
      phone: '',
      specialities: [],
      email: '',
      dni: '',
      idMedi: 0,
      isEdit: false,
      titleForm: 'Agregar Medico'
    };
  },

  mounted() {
    this.getAll();
  },
  methods: {
    getAll() {
      axios.get("http://localhost:8080/api/doctors").then((resp) => {
        console.log(resp.info);
        this.doctors = resp.data;
      });
    },
    saveDoctor() {
      var data = { fullname: this.fullname, address: this.address, phone: this.phone, email: this.email, specialities: this.specialities , dni: this.dni }
      axios.post('http://localhost:8080/api/doctors', data).then(() => {
        toastr.success('¡Datos guardado exitosamente!');
        this.getAll();
        this.resetInput();
      }).catch((err) => {
          toastr.error('Error al guardar: ' + err.message);
      })
    },
    editDoctor(id) {
      this.isEdit = true;
      this.titleForm = 'Actualizar Medico';
      axios.get("http://localhost:8080/api/doctors/" + id).then((resp) => {
        console.log(resp);
        this.fullname = resp.data.fullname;
        this.address = resp.data.address;
        this.phone = resp.data.phone;
        this.email = resp.data.email;
        this.dni = resp.data.dni;
        this.specialities = resp.data.specialities;
        this.idMedi = resp.data.id;
      });
    },
    updateDoctor() {
      var data = { fullname: this.fullname, address: this.address, phone: this.phone, email: this.email, specialities: this.specialities , dni: this.dni }
      axios.put('http://localhost:8080/api/doctors/' + this.idMedi, data).then(() => {
        toastr.info('¡Datos actualizados exitosamente!');
        this.getAll();
      }).catch((err) => {
        toastr.error('Error al actualizar: ' + err.message);
      })
      this.titleForm = 'Agregar Medico';
      this.resetInput();
    },
    deleteDoctor(id) {
      axios.delete("http://localhost:8080/api/doctors/" + id).then(() => {
        toastr.warning('¡Datos eliminados exitosamente!');
        this.getAll();
      }).catch(() => {
        toastr.error('Error al eliminar: ' + err.message);
      })
    },
    resetInput() {
        this.fullname = '';
        this.address = '';
        this.phone = '';
        this.email = '';
        this.dni = '';
        this.specialities = null;
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
