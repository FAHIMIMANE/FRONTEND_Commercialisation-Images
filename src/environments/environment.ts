// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebaseConfig : {
    apiKey: 'AIzaSyCsX5bGmpff4sKvhb3pEveuLO6y60PAy4c',
    authDomain: 'tu-cartera.firebaseapp.com',
    projectId: 'tu-cartera',
    storageBucket: 'tu-cartera.appspot.com',
    messagingSenderId: '522710714574',
    appId: '1:522710714574:web:cce8f153c273e0080c289f',
    measurementId: 'G-4B6CV2NJ76'
  },
  production: false,
  dateFormatCreate: 'dd/mm/yy',
  dateFormatEdit: 'dd/mm/yy',
  dateFormatView: 'dd/mm/yy',
  dateFormatList: 'dd/MM/yyyy',
  trueValue: 'Vrai',
  falseValue: 'Faux',
  emptyForExport: '-----',

  baseUrl: 'http://localhost:8036/api/',
  apiUrl: 'http://localhost:8036/api/',
  loginUrl: 'http://localhost:8036/',
  rootAppUrl: 'app', adminUrl: undefined,


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
