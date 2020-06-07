<?php

//require __DIR__ . '/../LolBoard/public/index.php';
//exit();

class LolApiProxy
{
    private $apiKey = 'RGAPI-173102c1-99e6-4625-8797-c0b142c10cb7';
    private $apiRootUrl = 'https://euw1.api.riotgames.com/lol';
    private $dataRootUrl = 'http://ddragon.leagueoflegends.com/cdn/10.11.1/data/fr_FR';

    public function query($endpoint, $method = 'get', $data = [])
    {
        if (strpos($endpoint, '/data') === 0) {
            $endpoint = str_replace('/data', '', $endpoint);
            $url = $this->dataRootUrl . $endpoint;
        } else {
            $url = $this->apiRootUrl . $endpoint . '?api_key=' . $this->apiKey;
        }

        $data = $this->httpQuery($url, $method, $data);
        return $data;
    }

    public function httpQuery($url, $method = 'get', $data = [], $headers = [])
    {
        $method = strtoupper($method);

        $headerString = '';
        $contentTypeHeader = false;

        foreach ($headers as $name => $value) {
            if ($name == 'Content-type') {
                $contentTypeHeader = true;
            }
            $headerString .= $name . ': ' . $value . "\r\n";
        }

        if (!$contentTypeHeader && $method == 'POST') {
            $headerString = 'Content-type: application/x-www-form-urlencoded' . "\r\n" . $headerString;
        }

        $raw = http_build_query($data);

        $options = [
            'http' => [
                'header' => $headerString . 'Content-Length: ' . strlen($raw) . "\r\n",
                'method' => $method,
                'content' => $raw,
                'request_fulluri' => true
            ],
        ];
        $context = stream_context_create($options);
        return file_get_contents($url, false, $context);
    }
}

$endpoint = $_GET['endpoint'];

$cachePath = __DIR__ . '/cache/' . dirname($endpoint);
$cacheFile = __DIR__ . '/cache/' . $endpoint;

if (!is_dir($cachePath)) {
    mkdir($cachePath, 0775, true);
}

if (is_file($cacheFile)) {
    $data = json_decode(file_get_contents($cacheFile));
    if (!$data) {
        unlink($cacheFile);
    }
}

//$cacheFile = preg_replace('`\W`', '-', $endpoint);
if (!is_file($cacheFile)) {
    $proxy = new LolApiProxy();
    $content = $proxy->query($endpoint);
    file_put_contents($cacheFile, $content);
}

//header('Content-type: application/json');
echo file_get_contents($cacheFile);
