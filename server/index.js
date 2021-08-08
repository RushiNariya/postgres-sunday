const express = require('express');
const path = require('path');
const http = require('http');
require('dotenv').config();
const cors = require('cors');

const app = express();

const userRoute = require('./routes/userRoute');
const hospitalRoute = require('./routes/admin/hospitalRoute');
const hospitalAdminRoute = require('./routes/admin/hospitalAdminRoute');
const doctorRoute = require('./routes/admin/doctorRoute');
const generalNotesRoute = require('./routes/admin/generalNotesRoute');
const announcementRoute = require('./routes/hospitalAdmin/announcementRoute');
const hospitalAdminAppointmentRoute = require('./routes/hospitalAdmin/appointmentRoute');
const patientRoute = require('./routes/hospitalAdmin/patientRoute');
const hospitalAdminQueryRoute = require('./routes/hospitalAdmin/queryRoute');
const patientAppointmentRoute = require('./routes/patient/appointmentRoute');
const patientQueryRoute = require('./routes/patient/queryRoute');
const doctorAppointmentsRoute = require('./routes/doctor/doctorRoute');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(__dirname, 'public', 'images')));

app.get('/', (req, res) => {
    res.send('<b>My</b> first express http server');
});

app.use('/user/', userRoute);
app.use('/hospital/', hospitalRoute);
app.use('/doctors/', doctorAppointmentsRoute);
app.use('/doctor/', doctorRoute);
app.use('/notes/', generalNotesRoute);
app.use('/announcement/', announcementRoute);
app.use('/hadmin/appointment/', hospitalAdminAppointmentRoute);
app.use('/hadmin/query', hospitalAdminQueryRoute);
app.use('/patient/appointment/', patientAppointmentRoute);
app.use('/patient/query/', patientQueryRoute);
app.use('/patient/', patientRoute);
app.use('/hadmin/', hospitalAdminRoute);

const server = http.createServer(app);

server.listen(5000, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening on port ${process.env.PORT}.`);
});
