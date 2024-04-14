from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase
from map_app.models import Sighting_Data
import json


"""
This test will send a post request to signup to first create a new user and 
acquire the token provided in the response. Then it will set the token under the 
AUTHORIZATION HEADER of the next request where the APIView will utilize TokenAuthentication
to authenticate the user.

The Client will then send a POST request to the endpoint with the name of "new_sighting"
and pass in the data. This will create a new sighting with a ManytoOne
relationship to the profile and a OnetoMany relationship to the reactions.
This endpoint must return the following Response status code of 201
"""

data = {
        "requestData":{
        "lat": 0,
        "lon": 0,
        "user": 1,
        "data_source": None,
        "num_Adults": 2,
        "num_Calf": 0,
        "activity": "Swimming",
        "comments": "TEST",
        "sighting_date": "2024-04-12T04:19:36.022Z",
        "created_date": "2024-04-12T04:19:36.022Z",
        "image": "https://i.natgeofe.com/k/1e254f54-affa-41ee-bbb1-014e2f071324/west-indian-manatee-two_4x3.jpg",
    }
}

answer = "new sighting was reported at lat:0.000000000000000 lon:0.000000000000000"


class Test_new_sighting(APITestCase):
    fixtures=['sighting_data.json']

    def create_new_sighting(self):
        client = Client()
        sign_up_response = client.post(
            reverse("signup"),
            data={
                "email": "test@email.com",
                "password": "test",
                "display_name": "DUMMY",
            },
            content_type="application/json",
        )
        response_body = json.loads(sign_up_response.content)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {response_body['token']}")
        response = self.client.post(
            reverse("new_sighting"), data=json.dumps(data), content_type="application/json"
        )
        with self.subTest():
            self.assertTrue(response.status_code == 201)
        self.assertEqual(json.loads(response.content), answer)
