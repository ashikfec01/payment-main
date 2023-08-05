<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WebsiteController extends Controller
{
    // welcome page main path
    public function welcome()
    {
        return Inertia::render('Website/Home/Home');
    }

    // products payment tools
    public function PaymenTools()
    {
        return Inertia::render('Website/Products/PaymenTools');
    }

    // products Donation Tools
    public function DonationTools()
    {
        return Inertia::render('Website/Products/DonationTools');
    }

    // products Mass Payments
    public function MassPayments()
    {
        return Inertia::render('Website/Products/MassPayments');
    }

    // products Fiat
    public function Fiat()
    {
        return Inertia::render('Website/Products/Fiat');
    }

    // Pricing
    public function Pricing()
    {
        return Inertia::render('Website/Pricing');
    }

    // Affiliate Program
    public function AffiliateProgram()
    {
        return Inertia::render('Website/AffiliateProgram');
    }

    // Supported Coins
    public function SupportedCoins()
    {
        return Inertia::render('Website/SupportedCoins');
    }

    // Status Page
    public function StatusPage()
    {
        return Inertia::render('Website/Help/StatusPage');
    }

    // Contact Us
    public function ContactUs()
    {
        return Inertia::render('Website/Help/ContactUs');
    }

    // About
    public function About()
    {
        return Inertia::render('Website/Help/About');
    }

    // Help
    public function Help()
    {
        return Inertia::render('Website/Help/FAQ');
    }
}
