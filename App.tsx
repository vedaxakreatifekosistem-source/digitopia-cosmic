
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import LiveStreaming from './components/LiveStreaming';
import DiscoverCreator from './components/DiscoverCreator';
import ExploreProduct from './components/ExploreProduct';
import RentCostume from './components/RentCostume';
import OfficialMerchandise from './components/OfficialMerchandise';
import Login from './components/Signin';
import Signup from './components/Signup';
import AccountConfirmation from './components/AccountConfirmation';
import SuccessCreateAccount from './components/SuccessCreateAccount';
import ResetPassword from './components/ResetPassword';
import PasswordConfirmation from './components/PasswordConfirmation';
import RewritePassword from './components/RewritePassword';
import SuccessChangePassword from './components/SuccessChangePassword';
import ProductDetail from './components/ProductDetail';
import CreatorDetail from './components/CreatorDetail';
import FansProfile from './components/FansProfile';
import CreatorProfile from './components/CreatorProfile';
import TermsOfUse from './components/TermsOfUse';
import PrivacyPolicy from './components/PrivacyPolicy';
import EditProfile from './components/EditProfile';
import BecomeCreator from './components/BecomeCreator';
import CreatorTerms from './components/CreatorTerms';
import CreatorEnrollment from './components/CreatorEnrollment';
import OverlayCustomizer from './components/OverlayCustomizer';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [selectedOverlay, setSelectedOverlay] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreator, setIsCreator] = useState(false); // Track if user is a creator
  const [lastView, setLastView] = useState('explore-product');
  const [creatorTermsAccepted, setCreatorTermsAccepted] = useState(false);

  const handleProductSelect = (product: any) => {
    setLastView(currentView);
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleCustomizeOverlay = (overlay: any) => {
    setSelectedOverlay(overlay);
    setCurrentView('overlay-customizer');
  };

  const handleBackFromDetail = () => {
    setSelectedProduct(null);
    setCurrentView(lastView);
  };

  const handleBackToDiscover = () => {
    setSelectedCreator(null);
    setCurrentView('discover-creator');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    // Logic to determine if user is creator (mocked)
    // For prototype, we default to fan unless they go through the Become Creator flow
    if (selectedProduct) {
        setCurrentView('product-detail');
    } else {
        setCurrentView(isCreator ? 'creator-profile' : 'fans-profile');
    }
  };

  const handleCreatorRegistrationSuccess = () => {
      setIsCreator(true);
      setCurrentView('creator-profile');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsCreator(false);
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,400;500;600;700&display=swap');
        body {
          font-family: 'Nunito Sans', sans-serif;
        }
      `}</style>

      <Navbar 
        onNavigate={setCurrentView} 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout} 
        isCreator={isCreator} 
      />
      
      {currentView === 'landing' && (
        <>
          <main className=""> 
            <Hero onNavigate={setCurrentView} />
            <Features />
            <FAQ />
          </main>
          <Footer onNavigate={setCurrentView} />
        </>
      )}

      {currentView === 'live-streaming' && <LiveStreaming />}
      {currentView === 'discover-creator' && (
        <DiscoverCreator 
            onCreatorSelect={(creator) => {
                setSelectedCreator(creator);
                setCurrentView('creator-detail');
            }} 
        />
      )}
      {currentView === 'creator-detail' && (
        <>
            <div className="fixed top-[100px] left-6 z-50">
                <button 
                    onClick={handleBackToDiscover}
                    className="flex items-center gap-2 text-white bg-black/60 hover:bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-all cursor-pointer"
                >
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">Back</span>
                </button>
            </div>
            <CreatorDetail 
                creator={selectedCreator} 
                onProductSelect={handleProductSelect} 
                onCreatorSelect={(creator) => {
                    setSelectedCreator(creator);
                    setCurrentView('creator-detail');
                }}
            />
        </>
      )}
      {currentView === 'fans-profile' && <FansProfile onProductSelect={handleProductSelect} onNavigate={setCurrentView} />}
      {currentView === 'creator-profile' && <CreatorProfile onNavigate={setCurrentView} onProductSelect={handleProductSelect} onCustomizeOverlay={handleCustomizeOverlay} />}
      {currentView === 'overlay-customizer' && <OverlayCustomizer onNavigate={setCurrentView} overlayData={selectedOverlay} />}
      {currentView === 'edit-profile' && <EditProfile onNavigate={setCurrentView} />}
      
      {/* Become Creator Flow */}
      {currentView === 'become-creator' && <BecomeCreator onNavigate={setCurrentView} termsAccepted={creatorTermsAccepted} />}
      
      {currentView === 'explore-product' && <ExploreProduct onProductSelect={handleProductSelect} />}
      {currentView === 'product-detail' && (
        <ProductDetail 
            product={selectedProduct} 
            onBack={handleBackFromDetail} 
            isLoggedIn={isLoggedIn}
            onAuthRedirect={() => setCurrentView('login')}
            isOwner={lastView === 'creator-profile'}
        />
      )}
      {currentView === 'rent-costume' && <RentCostume />}
      {currentView === 'official-merchandise' && <OfficialMerchandise />}
      {currentView === 'login' && <Login onNavigate={setCurrentView} onLogin={handleLoginSuccess} />}
      {currentView === 'signup' && <Signup onNavigate={setCurrentView} />}
      {currentView === 'account-confirmation' && <AccountConfirmation onNavigate={setCurrentView} />}
      
      {/* Account Creation Success (Fan) */}
      {currentView === 'success-create-account' && (
        <SuccessCreateAccount 
            onNavigate={(view) => setCurrentView(view)} 
        />
      )}

      {/* Creator Enrollment Success (Creator) */}
      {currentView === 'creator-enrollment' && (
        <CreatorEnrollment 
            onNavigate={handleCreatorRegistrationSuccess}
        />
      )}
      
      {currentView === 'reset-password' && <ResetPassword onNavigate={setCurrentView} />}
      {currentView === 'password-confirmation' && <PasswordConfirmation onNavigate={setCurrentView} />}
      {currentView === 'rewrite-password' && <RewritePassword onNavigate={setCurrentView} />}
      {currentView === 'success-change-password' && <SuccessChangePassword onNavigate={setCurrentView} />}
      
      {currentView === 'terms-of-use' && (
        <>
          <TermsOfUse />
          <Footer onNavigate={setCurrentView} />
        </>
      )}

      {currentView === 'privacy-policy' && (
        <>
          <PrivacyPolicy />
          <Footer onNavigate={setCurrentView} />
        </>
      )}

      {currentView === 'creator-terms' && (
        <>
          <CreatorTerms onNavigate={setCurrentView} onAccept={() => setCreatorTermsAccepted(true)} />
          <Footer onNavigate={setCurrentView} />
        </>
      )}
    </div>
  );
}
