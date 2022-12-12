<template>
  <div class="container">
    <div class="row">
      <div v-if="isAdd" class="col-md-12">
        <div class="card card-one">
          <div class="card-header header-one">
            {{ titleForm }}   |  <button class="btn btn-primary float-right" @click="hiddenForm()">Listado citas</button>
          </div>
          <div class="card-body">
            <form class="forms-sample">
              <div class="row">
                <div class="col-md-12">
                  <div class="card">
                    <div class="card-header">
                      Datos del Paciente
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-3">
                          <div class="form-group">
                            <label for="patientName">Nombre</label>
                            <input type="text" class="form-control" v-model="patientName" />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label for="patientAddress">Dirección</label>
                            <input type="text" class="form-control" v-model="patientAddress" />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label for="patientPhone">Teléfono</label>
                            <input type="tel" class="form-control" v-model="patientPhone" />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label for="patientDni">DNI</label>
                            <input type="text" class="form-control" v-model="patientDni" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mt-1">
                  <div class="card">
                    <div class="card-header">
                      Datos de la Cita
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label for="doctorName">Doctor</label>
                            <select class="form-control" v-model="doctorName">
                              <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.fullname">
                                {{ doctor.fullname }}</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label for="appointDate">Fecha</label>
                            <input type="date" class="form-control" v-model="appointDate" />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label for="appointTime">Hora</label>
                            <input type="time" class="form-control" v-model="appointTime" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="appointReason">Observación/Rasón</label>
                            <textarea v-model="appointReason" class="form-control" cols="30" rows="5"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button type="button" v-if="!isEdit" class="btn btn-success m-2" @click="saveAppointment">Guardar</button>
              <button type="button" v-if="isEdit" class="btn btn-info m-2"
                @click="updateAppointment">Actualizar</button>
              <button class="btn btn-light">Cancel</button>
            </form>
          </div>
        </div>
      </div>
      <div v-if="!isAdd" class="col-md-12 mt-2">
        <div class="card card-one">
          <div class="card-header header-one">
            Listado De Citas | <button class="btn btn-warning float-right" @click="showForm()">Programar cita</button>
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
                    <button class="btn btn-info m-2" @click="detailsAppointment(appointment.id)" title="ver detalles">
                      <span class="fas fa-eye"></span>
                    </button>
                    <button class="btn btn-secondary m-2" @click="editAppointment(appointment.id)"> <span
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
  name: "Appointment",
  data() {
    return {
      appointments: [],
      doctors: [],
      patientName: '',
      patientAddress: '',
      patientPhone: '',
      userName: 'Admin',
      doctorName: '',
      patientDni: '',
      status: 'Pendiente',
      appointDate: '',
      appointTime: '',
      appointReason: '',
      idMedi: 0,
      isEdit: false,
      titleForm: 'Agregar Cita',
      isAdd: false,
    };
  },

  mounted() {
    this.getAll();
    axios.get("http://localhost:8080/api/doctors").then((resp) => {
      this.doctors = resp.data;
    });
  },
  methods: {
    showForm() {
      this.isAdd = true;
    },
    hiddenForm(){
      this.isAdd = false;
    },
    getAll() {
      axios.get("http://localhost:8080/api/appointments").then((resp) => {
        console.log(resp);
        this.appointments = resp.data;
      });
    },
    saveAppointment() {
      var data = {
        patientName: this.patientName, patientAddress: this.patientAddress,
        patientPhone: this.patientPhone, userName: this.userName, status: this.status,
        doctorName: this.doctorName, patientDni: this.patientDni, appointDate: this.appointDate,
        appointTime: this.appointTime, appointReason: this.appointReason
      }
      axios.post('http://localhost:8080/api/appointments', data).then(() => {
        toastr.success('¡Datos guardado exitosamente!');
        this.hiddenForm();
        this.getAll();
        this.resetInput();
      }).catch((err) => {
        toastr.error('Error al guardar: ' + err.message);
      })
    },
    editAppointment(id) {
      this.isEdit = true;
      this.titleForm = 'Actualizar Cita';
      axios.get("http://localhost:8080/api/appointments/" + id).then((resp) => {
        console.log(resp);
        this.fullname = resp.data.fullname;
        this.patientAddress = resp.data.patientAddress;
        this.phone = resp.data.phone;
        this.email = resp.data.email;
        this.dni = resp.data.dni;
        this.age = resp.data.age;
        this.idMedi = resp.data.id;
      });
    },
    updateAppointment() {
      var data = {
        patientName: this.patientName, patientAddress: this.patientAddress,
        patientPhone: this.patientPhone, userName: this.userName, status: this.status,
        doctorName: this.doctorName, patientDni: this.patientDni, appointDate: this.appointDate,
        appointTime: this.appointTime, appointReason: this.appointReason
      }
      axios.put('http://localhost:8080/api/appointments/' + this.idMedi, data).then(() => {
        toastr.info('¡Datos actualizados exitosamente!');
        this.getAll();
        this.hiddenForm();
      }).catch((err) => {
        toastr.error('Error al actualizar: ' + err.message);
      })
      this.titleForm = 'Agregar Cita';
      this.resetInput();
    },
    // deleteAppointment(id) {
    //   axios.delete("http://localhost:8080/api/appointments/" + id).then(() => {
    //     toastr.warning('¡Datos eliminados exitosamente!');
    //     this.getAll();
    //   }).catch(() => {
    //     toastr.error('Error al eliminar: ' + err.message);
    //   })
    // },
    resetInput() {
      this.fullname = '';
      this.patientAddress = '';
      this.phone = '';
      this.email = '';
      this.dni = '';
      this.age = null;
    }
  },
};
</script>
<style scoped>
.card-one {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.header-one {
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
