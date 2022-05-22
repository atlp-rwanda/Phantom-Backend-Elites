'use strict';
const Request = require('request');
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Routes', [{
      name: "Kimironko - Downtown",
      busstations: [1, 2],
      routeData: JSON.stringify(
        // Request.get('https://api.mapbox.com/directions/v5/mapbox/driving/30.057048797607425,-1.9213888919953006;30.087604522705075,-1.9164135037087677?geometries=geojson&access_token=pk.eyJ1IjoiaWlzaGltd2UiLCJhIjoiY2wwd2Q3aW15MGM2dTNrcGVkZ2kzYTZ3eiJ9._jFYEUoc19EZW-WYArxx4g')
        {
          "routes": [
            {
              "weight_name": "auto",
              "weight": 1027.244,
              "duration": 959.076,
              "distance": 4995.408,
              "legs": [
                {
                  "via_waypoints": [

                  ],
                  "admins": [
                    {
                      "iso_3166_1_alpha3": "RWA",
                      "iso_3166_1": "RW"
                    }
                  ],
                  "weight": 1027.244,
                  "duration": 959.076,
                  "steps": [

                  ],
                  "distance": 4995.408,
                  "summary": "KG 14 Avenue, KG 487 Street"
                }
              ],
              "geometry": {
                "coordinates": [
                  [
                    30.057048,
                    -1.921359
                  ],
                  [
                    30.056417,
                    -1.921122
                  ],
                  [
                    30.05603,
                    -1.92139
                  ],
                  [
                    30.054143,
                    -1.92142
                  ],
                  [
                    30.05457,
                    -1.920611
                  ],
                  [
                    30.055696,
                    -1.920089
                  ],
                  [
                    30.056103,
                    -1.9197
                  ],
                  [
                    30.056439,
                    -1.917064
                  ],
                  [
                    30.05849,
                    -1.916271
                  ],
                  [
                    30.060329,
                    -1.915998
                  ],
                  [
                    30.061242,
                    -1.916135
                  ],
                  [
                    30.063382,
                    -1.915298
                  ],
                  [
                    30.064751,
                    -1.914371
                  ],
                  [
                    30.065379,
                    -1.914187
                  ],
                  [
                    30.066706,
                    -1.915072
                  ],
                  [
                    30.068121,
                    -1.915095
                  ],
                  [
                    30.069323,
                    -1.91569
                  ],
                  [
                    30.070336,
                    -1.915782
                  ],
                  [
                    30.07264,
                    -1.914549
                  ],
                  [
                    30.075631,
                    -1.913632
                  ],
                  [
                    30.076861,
                    -1.91255
                  ],
                  [
                    30.07933,
                    -1.913104
                  ],
                  [
                    30.079832,
                    -1.913036
                  ],
                  [
                    30.080678,
                    -1.91254
                  ],
                  [
                    30.082049,
                    -1.912271
                  ],
                  [
                    30.083865,
                    -1.912628
                  ],
                  [
                    30.086124,
                    -1.912597
                  ],
                  [
                    30.086729,
                    -1.912939
                  ],
                  [
                    30.087267,
                    -1.913602
                  ],
                  [
                    30.087431,
                    -1.916411
                  ]
                ],
                "type": "LineString"
              }
            }
          ],
          "waypoints": [
            {
              "distance": 3.276,
              "name": "",
              "location": [
                30.057048,
                -1.921359
              ]
            },
            {
              "distance": 19.309,
              "name": "KG 487 Street",
              "location": [
                30.087431,
                -1.916411
              ]
            }
          ],
          "code": "Ok",
          "uuid": "cmE-i3YTZxBw7tDWKuPasynrGdk0NR8iHTQM79BNyIN96h4_Xt1c7A=="
        }
      ),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Routes', null, {});
  }
};