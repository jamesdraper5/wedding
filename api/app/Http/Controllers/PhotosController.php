<?php namespace App\Http\Controllers;

session_start();
//require 'vendor/autoload.php';

use Debugbar;
use Log;
use Mail;
use Request;

use Facebook\FacebookSession;
use Facebook\FacebookRedirectLoginHelper;
use Facebook\FacebookRequest;
use Facebook\Entities\AccessToken;

class PhotosController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Welcome Controller
	|--------------------------------------------------------------------------
	|
	| This controller renders the "marketing page" for the application and
	| is configured to only allow guests. Like most of the other sample
	| controllers, you are free to modify or remove it as you desire.
	|
	*/

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		FacebookSession::setDefaultApplication('376809592527964', 'd762956112187c3eba3981287e6ead01');
	}


	/**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function getFacebookLoginUrl()
	{	
		
		$helper = new FacebookRedirectLoginHelper('http://wedding.local/api/public/photos');
		$loginUrl = $helper->getLoginUrl();

		return response()->json([
    		'status' => 'okay',
    		'url' => $loginUrl
    	]);

	}


	/**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function getTaggedPhotos()
	{	

		$longLivedAccessToken = new AccessToken("CAAFWtNHpHFwBALqO0OrG6AhqdiYBmHiuJ9B2gRhXKmUMq48y9ePHvJJEWBt4JVZCeUcGwKgkOkyYZBXRaAzMtJ1gYWfW754qzqsuZA1ZC99A2DPjec4464PPJStHZACzICtKN5P26mRcrQOmaq57GhMSLMZAiuLoDUoSdOId0eEBdbkZAqjuBmcqP9wKh1OwnIZD");

		try {
		  // Get a code from a long-lived access token
		  $code = AccessToken::getCodeFromAccessToken($longLivedAccessToken);
		} catch(FacebookSDKException $e) {
		  Debugbar::info('Error getting code: ' . $e->getMessage());
		  exit;
		}

		try {
		  // Get a new long-lived access token from the code
		  $newLongLivedAccessToken = AccessToken::getAccessTokenFromCode($code);
		} catch(FacebookSDKException $e) {
		  Log::info('Error getting a new long-lived access token: ' . $e->getMessage());
		  exit;
		}

		$accessTokenInfo = $newLongLivedAccessToken->getInfo();
		Debugbar::info($accessTokenInfo);

		// Make calls to Graph using $shortLivedAccessToken
		$session = new FacebookSession($newLongLivedAccessToken);

		$request = new FacebookRequest(
			$session, 
			'GET', 
			'/me/photos'
		);
		$userData = $request->execute()
		  	->getGraphObject()
		  	->asArray();

		Debugbar::info($userData);

		$photos = [];
		$userPics = $userData["data"];

		Debugbar::info($userPics);

		foreach ($userPics as $photo) {
			# code...
			//Debugbar::info($photo->images);

			//$pics = $photo->images;
			$imgLink = $photo->source;
			$obj = (object)array("link" => $imgLink, "width" => 200, "height" => 400);

			array_push($photos,$obj);


			/*
			foreach ($pics as $pic) {
				# code...
				Debugbar::info($pic);

				array_push($photos,$pic);

				
			}
			*/
		}
		//Debugbar::info($pics);
		Debugbar::info($photos);
		/*
		*/
		/*
		*/
		return response()->json([
    		'status' => 'okay',
    		'data' => $photos
    	]);

		return view('welcome');

		/*
		$helper = new FacebookRedirectLoginHelper('http://wedding.local/api/public/photos');
		try {
		  	$session = $helper->getSessionFromRedirect();
		  	//Log::info('$session: ' . $session);
		} catch(FacebookRequestException $ex) {

		  	// When Facebook returns an error
			return response()->json([
	    		'status' => 'error',
	    		'data' => $ex
	    	]);

		} catch(\Exception $ex) {

		  	// When validation fails or other local issues
			return response()->json([
	    		'status' => 'error',
	    		'data' => $ex
	    	]);

		}

		if ($session) {


			$accessToken = $session->getAccessToken();
			Log::info('$accessToken: ' . $accessToken);
			Log::info('$accessToken: ' . gettype($accessToken));


			$longLivedAccessToken = $accessToken->extend();
			Log::info('$longLivedAccessToken: ' . $longLivedAccessToken);


			return response()->json([
	    		'status' => 'okay',
	    		'accessToken' => (string)$accessToken,
	    		'longLivedAccessToken' => (string)$longLivedAccessToken
	    	]);

		  	
		  	// Logged in
			
			$request = new FacebookRequest(
			  $session,
			  'GET',
			  '/me/photos'
			);
			$response = $request->execute();
			$graphObject = $response->getGraphObject();
			

			return response()->json([
	    		'status' => 'okay',
	    		'data' => $graphObject,
	    		'session' => $session,
	    		'response' => $response
	    	]);
		}
		*/

		//CAAFWtNHpHFwBACtLfFeQUamYpQZAFmr8ZAyU095BPHBJ5CVQKZCzfJCCNuYWzoMA1C9ptjGiwhhLH66kZCaRuvHZBrZA9dvnPMLD4384lwzxB9ZA2P30rOhXWqEPL0YeaAyr3WAD2gLe58F2okpoKgFKyGBQW7i0G3d9bRzFNfuk9JJuTNJMjcA4ZBZBUhEJVB2MNdcNR1P8A4jKbx73QSXnA
  
	}

}
