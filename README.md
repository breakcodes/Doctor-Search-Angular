Doctor Search Application
=========================

A web application for searching doctors online and view their practo profiles. The search can be done in two ways:

>First is one the basis of location(city) only.
>Second is based on location(city) as well as speciality of a doctor
>You can also sort the result based on various parameters.

Note : Searching only on the basis of speciality is not allowed as practo api does not allow this.

Installation
------------
>npm install

#Dependencies installed are

"express": "4.14.0",
"jquery": "3.0.0",
"path": "0.12.7",
"request": "2.72.0"

#Running the Server

In the root directory,
>npm start

Usage
-----

>Visit Doctor search using http://ec2-54-149-184-26.us-west-2.compute.amazonaws.com:8085/

>Select the location, then based on the selected location available list of specialities get generated for that city then select specility.It also has option to sort it using various parameters, select sorting method. Then it swill display the list of doctors.


