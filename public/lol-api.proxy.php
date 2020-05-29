<?php

class LolApiProxy
{
    private $apiKey =  'RGAPI-e6c4349f-c973-4767-948b-a3f7d575642f';
    private $apiRootUrl = 'https://euw1.api.riotgames.com/lol';
    private $dataRootUrl = 'http://ddragon.leagueoflegends.com/cdn/10.11.1/data/fr_FR';

    public function query($endpoint, $method = 'get', $data = [])
    {
        if(strpos($endpoint, '/data') === 0 ) {
            $endpoint = str_replace('/data', '', $endpoint);
            $url = $this->dataRootUrl . $endpoint;
        }
        else {
            $url = $this->apiRootUrl . $endpoint . '?api_key='  . $this->apiKey;
        }
        
        $data = $this->httpQuery($url , $method, $data);
        return $data;
    }



    public function httpQuery($url, $method='get', $data=array(), $headers=array()) {

        $method=strtoupper($method);
    
        $headerString='';
        $contentTypeHeader=false;
        
        foreach ($headers as $name=>$value) {
            if($name=='Content-type') {
                $contentTypeHeader=true;
            }
            $headerString.=$name.': '.$value."\r\n";
        }
        
        if(!$contentTypeHeader && $method=='POST') {
            $headerString='Content-type: application/x-www-form-urlencoded'."\r\n".$headerString;
        }
    
    
        $raw=http_build_query($data);
        
        $options = array(
            'http' => array(
                'header'  => $headerString."Content-Length: ".strlen($raw)."\r\n",
                'method'  => $method,
                'content' => $raw,
                'request_fulluri' => true
            ),
        );
        $context  = stream_context_create($options);
        return file_get_contents($url, false, $context);
    }

}




$endpoint = $_GET['endpoint'];


$cachePath = __DIR__ . '/cache/' . dirname($endpoint);
$cacheFile = __DIR__.'/cache/' . $endpoint;

if(!is_dir($cachePath)) {
    mkdir($cachePath, 0775, true);
}


if(is_file($cacheFile)) {
    $data = json_decode(file_get_contents($cacheFile));
    if(!$data) {
        unlink($cachePath);
    }
}

//$cacheFile = preg_replace('`\W`', '-', $endpoint);
if(!is_file($cacheFile)) {
    $proxy = new LolApiProxy();
    $content = $proxy->query($endpoint);
    file_put_contents($cacheFile, $content);
}


//header('Content-type: application/json');
echo file_get_contents($cacheFile);



