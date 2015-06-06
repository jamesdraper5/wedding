<?php namespace App\Http\Controllers;

session_start();
//require 'vendor/autoload.php';

use Debugbar;
use Log;
use Mail;
use Request;
use DateTime;

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

		$date = Request::input('weddingdate');
		$longLivedAccessToken = new AccessToken("CAAFWtNHpHFwBALqO0OrG6AhqdiYBmHiuJ9B2gRhXKmUMq48y9ePHvJJEWBt4JVZCeUcGwKgkOkyYZBXRaAzMtJ1gYWfW754qzqsuZA1ZC99A2DPjec4464PPJStHZACzICtKN5P26mRcrQOmaq57GhMSLMZAiuLoDUoSdOId0eEBdbkZAqjuBmcqP9wKh1OwnIZD");
		$numDaysAfterWedding = 4; // show tagged pics uploaded up to 2 days after wedding


		//$date = "2014-05-13";
		$weddingDate = strtotime($date);
		Debugbar::info("weddingDate", $weddingDate);

		$interval = date_interval_create_from_date_string($numDaysAfterWedding . ' days');
		Debugbar::info("interval", $interval);

		$dateAdded = date_add( new DateTime($date), $interval );
		Debugbar::info("dateAdded", $dateAdded);

		$dateFormatted = date_format( $dateAdded, 'Y-m-d' );
		Debugbar::info("dateFormatted", $dateFormatted);

		$cutoffDate = strtotime( $dateFormatted );
		Debugbar::info("cutoffDate", $cutoffDate);
		/*
		*/

		//return view('welcome');

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

		Debugbar::info("weddingDate", $date);

		foreach ($userPics as $photo) {
			# code...
			Debugbar::info($photo->images);

			//$pics = $photo->images;
			$imgLink = $photo->source;
			$imgWidth  = $photo->width;
			$imgHeight  = $photo->height;
			$createdDate = strtotime($photo->created_time);

			$obj = (object)array("link" => $imgLink, "width" => $imgWidth, "height" => $imgHeight, "created" => $photo->created_time);

			if ( ($createdDate > $weddingDate) && ($createdDate < $cutoffDate)) {
				Debugbar::info("createdDate", $createdDate);
				Debugbar::info("weddingDate", $weddingDate);
				array_push($photos,$obj);
			}


		}
		//Debugbar::info($pics);
		Debugbar::info($photos);
		/*
		*/
		/*
		*/
		return response()->json([
    		'status' => 'okay',
    		'data' => $photos,
    		'date' => $date,
    		'cutoff' => $cutoffDate
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
