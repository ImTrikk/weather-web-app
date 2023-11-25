<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Exception;

class ForecastController extends Controller
{
    private $apiKey;

    public function getForecast(string $location)
    {
        $client = new Client();

        // access key in .env
        $this->apiKey = env('OPEN_WEATHER_API');

        // api from openWeather
        $url = "https://api.openweathermap.org/data/2.5/forecast?q={$location}&appid={$this->apiKey}";

        try {

            $forecast = $client->request('GET', $url);

            $forecastResponse = json_decode(
                $forecast->getBody()->getContents(),
                true
            );

            return response()->json([
                'location' => $location,
                'forecastResponse' => $forecastResponse,
            ]);

        } catch (Exception $e) {
            throw new Exception("Cannot connnect with openWeather API in forecast");
        }
    }
}
