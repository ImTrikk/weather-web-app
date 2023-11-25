<?php

namespace App\Http\Controllers;

use Exception;
use GuzzleHttp\Client;

class WeatherApiController extends Controller
{

    private $apiKey;

    public function getApiWeather(string $location)
    {

        $client = new Client();

        // access key in .env
        $this->apiKey = env('OPEN_WEATHER_API');

        // api from openWeather
        $url = "https://api.openweathermap.org/data/2.5/weather?q={$location}&appid={$this->apiKey}&units=metric";

        try {

            $weather = $client->request('GET', $url);

            $responseApi = json_decode(
                $weather->getBody()->getContents(),
                true
            );

            //return array response as json formatting
            return response()->json([
                'location' => $location,
                'weatherResponse' => $responseApi,
            ]);

        } catch (Exception $e) {
            throw new Exception('Cannot connnect with openWeather API');
        }
    }
}
