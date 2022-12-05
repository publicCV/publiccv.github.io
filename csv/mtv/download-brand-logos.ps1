$c | %{
	write-host $_
	$getError = $Null
	$outputFolder = "C:\Tmp\marco-vaz.github.io-master\images\test\"
	$brand = $_
	$logonumber = "2"
	$short = "$brand-$logonumber"
	$url = "https://www.brandsoftheworld.com/logo/$short"+"?original=1"
	$content = Invoke-WebRequest $url -UseBasicParsing -ErrorVariable getError -ErrorAction "SilentlyContinue" 
	if ($getError){
		$content = $Null
		$imageUrl = $Null
		write-host "Logo for brand $brand not found" -ForegroundColor yellow
	}else{
		$imageUrl = (($content.RawContent | findstr.exe cloudfront)[0]).split('"')[9]
		$extension = $imageUrl.split("?")[0].Substring($imageUrl.LastIndexOf("/") + 1).split('.')[1]
		write-host -ForegroundColor gree $imageUrl
		curl.exe -s $imageUrl -o "$outputFolder$brand.$extension"
	}
}



$getError = $Null
$outputFolder = "C:\Tmp\marco-vaz.github.io-master\images\test\"
$brand = "trendmicro"
$url = "https://www.brandsoftheworld.com/logo/$brand-2?original=1"
$content = Invoke-WebRequest $url -UseBasicParsing -ErrorVariable getError -ErrorAction "SilentlyContinue" | out-null
if (!($getError)){
	$image = (($content.RawContent | findstr.exe cloudfront)[0]).split('"')[9]
	$extension = $image.split("?")[0].Substring($image.LastIndexOf("/") + 1).split('.')[1]
	curl.exe $image -o "$outputFolder$brand.$extension"
}else{
	write-host "Logo for brand $brand not found" -ForegroundColor yellow
}
