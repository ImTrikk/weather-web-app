<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
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
        $url = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q={$location},us&mode=xml&appid={$this->apiKey}";

        try {

            $weather = $client->request('GET', $url);

        } catch (Exception $e) {
            throw new Exception("Cannot connnect with openWeather API");
        }
    }
}
