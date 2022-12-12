<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            {{titleForm}} a :{{patientName}} - {{patientDNI}}
          </div>
          <div class="card-body">
            <form class="forms-sample">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="prescription">Prescripción</label>
                    <select class="form-control" v-model="medicineSelect" multiple>
                      <option v-for="m in medicines" :key="m.id" :value="m.name">{{m.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="name">Observación</label>
                    <textarea v-model="comments" class="form-control" cols="30" rows="5"></textarea>
                  </div>
                </div>
              </div>
              <button type="button" v-if="!isEdit" class="btn btn-success m-2" @click="saveDiagnosis">Guardar</button>
              <!-- <button type="button" v-if="isEdit" class="btn btn-info m-2" @click="updateDiagnosis">Actualizar</button> -->
              <button class="btn btn-light">Cancel</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card card-one">
          <div class="card-header header-one">
            Listado De Citas
          </div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Paciente</th>
                  <th scope="col">P. Teléfono</th>
                  <th scope="col">Doctor</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Hora</th>
                  <th scope="col">Detalle</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="appointment in appointments" :key="appointment.id">
                  <td>{{ appointment.patientName }}</td>
                  <td>{{ appointment.patientPhone }}</td>
                  <td>{{ appointment.doctorName }}</td>
                  <td>{{ appointment.appointDate }}</td>
                  <td>{{ appointment.appointTime }}</td>
                  <td>{{ appointment.appointReason }}</td>
                  <td>
                    <span v-if="appointment.status == 'Pendiente'" class="badge badge-info">{{ appointment.status}}</span>
                    <span v-else-if="appointment.status == 'Enproceso'" class="badge badge-warning">{{ appointment.status
                    }}</span>
                    <span v-else class="badge badge-danger">{{ appointment.status }}</span>
                  </td>
                  <td>
                    <button class="btn btn-info m-2" @click="diagnosticar(appointment.id)" title="diagnosticar">
                      <span class="fas fa-edit"></span>
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
  name: "Diagnosis",
  data() {
    return {
      diagnosis: [],
      appointments: [],
      medicines: [],
      medicineSelect: [],
      patientName: '',
      patientDNI: '',
      comments: '',
      idMedi: 0,
      idAppoint: 0,
      isEdit: false,
      titleForm: 'Diagnosticar'
    };
  },

  mounted() {
    this.getAllAppoint();
    axios.get("http://localhost:8080/api/medicines").then((resp) => {
        console.log(resp);
        this.medicines = resp.data;
      });
  },
  methods: {
    getAllAppoint() {
      axios.get("http://localhost:8080/api/appointments").then((resp) => {
        console.log(resp);
        this.appointments = resp.data;
      });
    },
    diagnosticar(id){
      axios.get("http://localhost:8080/api/appointments/" + id).then((resp) => {
        console.log(resp);
        this.idAppoint = resp.data.id;
        this.patientName = resp.data.patientName;
        this.patientDNI = resp.data.patientDni;
      });
    },
    saveDiagnosis() {
      var data = { appointmentId: this.idAppoint, comments: this.comments, prescription: this.medicineSelect}
      axios.post('http://localhost:8080/api/diagnosis', data).then(() => {
      })
    },

    // editDiagnosis(id) {
    //   this.isEdit = true;
    //   this.titleForm = 'Actualizar Medicamento';
    //   axios.get("http://localhost:8080/api/diagnosis/" + id).then((resp) => {
    //     console.log(resp);
    //     // this.Diagnosiss = resp.data;
    //     this.name = resp.data.name;
    //     this.stock = resp.data.stock;
    //     this.expirationDate = resp.data.expirationDate;
    //     this.presentation = resp.data.presentation;
    //     this.status = resp.data.status;
    //     this.idMedi = resp.data.id;
    //   });
    // },

    // updateDiagnosis() {
    //   var data = { name: this.name, presentation: this.presentation, expirationDate: this.expirationDate, stock: this.stock, status: this.status }
    //   axios.put('http://localhost:8080/api/diagnosis/' + this.idMedi, data).then(() => {
    //     this.getAll();
    //   })
    //   this.titleForm = 'Agregar Medicamento';
    //   this.resetInput();
    // },
   
    resetInput() {
        this.idAppoint = 0;
        this.patientName = '';
        this.patientDNI = '';
        this.comments = '';
        this.medicineSelect = null;
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
