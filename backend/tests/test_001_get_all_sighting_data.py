from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase
import json



"""
This test will send a get request to the end point "all_sightings". This endpoint must return the following Response status code of 200. This test only compares the first 10 objects in the json response.
"""

answer = [
  {
    "id": 1,
    "lat": "-90734.0029088259",
    "lon": "6541065.2105382800",
    "User_ID": "Broward County GeoHub",
    "Num_Adults": 1,
    "Num_Calf": 1,
    "Activity": "Mating",
    "Comments": "",
    "Sighting_date": "2017-11-23T05:00:00Z",
    "Created_date": "2017-11-23T14:33:31Z",
    "Image": None
  },
  {
    "id": 2,
    "lat": "940716.2215881760",
    "lon": "687076.5107306910",
    "User_ID": "Broward County GeoHub",
    "Num_Adults": 1,
    "Num_Calf": 0,
    "Activity": "Swimming",
    "Comments": "",
    "Sighting_date": "2017-11-22T05:00:00Z",
    "Created_date": "2017-11-23T20:58:25Z",
    "Image": None
  },
  {
    "id": 3,
    "lat": "947671.4343837610",
    "lon": "687527.8080564360",
    "User_ID": "Broward County GeoHub",
    "Num_Adults": 1,
    "Num_Calf": 0,
    "Activity": "Feeding",
    "Comments": "",
    "Sighting_date": "2017-11-25T05:00:00Z",
    "Created_date": "2017-11-25T18:24:27Z",
    "Image": None
  },
  {
    "id": 4,
    "lat": "947207.4891174250",
    "lon": "687160.5502607750",
    "User_ID": "Broward County GeoHub",
    "Num_Adults": 1,
    "Num_Calf": 0,
    "Activity": "Swimming",
    "Comments": "",
    "Sighting_date": "2017-11-22T05:00:00Z",
    "Created_date": "2017-11-27T13:21:39Z",
    "Image": None
  },
  {
    "id": 5,
    "lat": "936129.1713790930",
    "lon": "628239.5562263580",
    "User_ID": "Broward County GeoHub",
    "Num_Adults": 1,
    "Num_Calf": 0,
    "Activity": "Resting",
    "Comments": "",
    "Sighting_date": "2017-12-03T05:00:00Z",
    "Created_date": "2017-12-03T19:26:42Z",
    "Image": None
  },
  {
    "id": 6,
    "lat": "947217.2558301760",
    "lon": "687156.4597177730",
    "User_ID": "Broward County GeoHub",
    "Num_Adults": 1,
    "Num_Calf": 0,
    "Activity": "Feeding",
    "Comments": "",
    "Sighting_date": "2017-12-09T05:00:00Z",
    "Created_date": "2017-12-09T18:09:04Z",
    "Image": None
  },
  {
    "id": 7,
    "lat": "898203.3774801750",
    "lon": "508038.2451202720",
    "User_ID": "Broward County GeoHub",
    "Num_Adults": 6,
    "Num_Calf": 0,
    "Activity": "Swimming",
    "Comments": "",
    "Sighting_date": "2017-12-16T05:00:00Z",
    "Created_date": "2017-12-17T20:22:23Z",
    "Image": None
  },
  {
    "id": 8,
    "lat": "898203.3774801750",
    "lon": "508038.2451202720",
    "User_ID": "Broward County GeoHub",
    "Num_Adults": 6,
    "Num_Calf": 0,
    "Activity": "Swimming",
    "Comments": "",
    "Sighting_date": "2017-12-16T05:00:00Z",
    "Created_date": "2017-12-17T20:25:19Z",
    "Image": None
  },
  {
    "id": 9,
    "lat": "957653.7884347590",
    "lon": "718016.0879590210",
    "User_ID": "Broward County GeoHub",
    "Num_Adults": 3,
    "Num_Calf": 2,
    "Activity": "Feeding",
    "Comments": "",
    "Sighting_date": "2017-12-18T05:00:00Z",
    "Created_date": "2017-12-18T16:20:10Z",
    "Image": None
  },
  {
    "id": 10,
    "lat": "938240.8925493430",
    "lon": "648895.9148479400",
    "User_ID": "Broward County GeoHub",
    "Num_Adults": 3,
    "Num_Calf": 1,
    "Activity": "Swimming",
    "Comments": "",
    "Sighting_date": "2017-12-18T05:00:00Z",
    "Created_date": "2017-12-19T22:30:38Z",
    "Image": None
  }
]



class Test_all_items(APITestCase):
    fixtures=["sighting_data.json"]

    def test_001_all_sightings(self):
        
        response = self.client.get(reverse("all_sightings"))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        print(json.loads(response.content)[:10])
        self.assertEqual(json.loads(response.content)[:10], answer)