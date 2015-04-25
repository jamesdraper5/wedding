<?php namespace App\Http\Controllers;

use Request;
use Mail;

class RSVPController extends Controller {

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
		//$this->middleware('guest');
	}

	/**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function sendResponse()
	{
		$data = Request::all();

		if (Mail::send('emails.rsvp',
		        array(
		            'name' => Request::input('name'),
		            'email' => Request::input('emailAddress'),
		            'phone' => Request::input('phoneNumber'),
		            'attendees' => Request::input('attendees'),
		            'extraInfo' => Request::input('extraInfo'),
		        ), function($message)
		    {
		        $message->from(Request::input('emailAddress'), Request::input('name'));
		        $message->to('jamesdrape@gmail.com')->cc('murphylucy1@yahoo.ie');
		        $message->subject('Wedding RSVP');
		    })
		) {

			return response()->json([
	    		'status' => 'okay',
	    		'data' => $data
	    	]);

	    } else {

			return response()->json([
	    		'status' => 'error'
	    	], 500);

	    }
	}

}
