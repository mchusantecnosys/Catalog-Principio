import React, { useState } from 'react';
import { CATALOG_PAGES } from './data/catalogData';
import { ViewMode } from './types';
import { Header } from './components/Header';
import { PageViewer } from './components/PageViewer';
import { GridViewer } from './components/GridViewer';
import { CustomizerModal } from './components/CustomizerModal';
import { IndexDrawer } from './components/IndexDrawer';
import { LuxuryCareModal } from './components/LuxuryCareModal';
import { ShareExportModal } from './components/ShareExportModal';

export default function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>('magazine');
  const [isIndexOpen, setIsIndexOpen] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [customizerProduct, setCustomizerProduct] = useState<'keychain' | 'pen' | 'agenda' | 'duo' | 'box'>('keychain');
  const [isCareOpen, setIsCareOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);

  const handleOpenCustomizerWithProduct = (productId: 'keychain' | 'pen' | 'agenda' | 'duo' | 'box') => {
    setCustomizerProduct(productId);
    setIsCustomizerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1E2022] flex flex-col font-sans-clean">
      {/* Top Refined Editorial Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenIndex={() => setIsIndexOpen(true)}
        onOpenCustomizer={() => {
          setCustomizerProduct('keychain');
          setIsCustomizerOpen(true);
        }}
        onOpenCare={() => setIsCareOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        currentPageIndex={currentPageIndex}
        totalPages={CATALOG_PAGES.length}
      />

      {/* Main Catalog View Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4">
        {viewMode === 'magazine' ? (
          <PageViewer
            pages={CATALOG_PAGES}
            currentPageIndex={currentPageIndex}
            onPageChange={(idx) => setCurrentPageIndex(idx)}
            onOpenCustomizerWithProduct={handleOpenCustomizerWithProduct}
            onOpenCare={() => setIsCareOpen(true)}
          />
        ) : (
          <GridViewer
            pages={CATALOG_PAGES}
            onSelectPage={(idx) => {
              setCurrentPageIndex(idx);
              setViewMode('magazine');
            }}
            onOpenCustomizerWithProduct={handleOpenCustomizerWithProduct}
          />
        )}
      </main>

      {/* Floating Drawers & Modals */}
      <IndexDrawer
        isOpen={isIndexOpen}
        onClose={() => setIsIndexOpen(false)}
        pages={CATALOG_PAGES}
        currentPageIndex={currentPageIndex}
        onSelectPage={(idx) => {
          setCurrentPageIndex(idx);
          setViewMode('magazine');
        }}
      />

      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        initialProductType={customizerProduct}
      />

      <LuxuryCareModal
        isOpen={isCareOpen}
        onClose={() => setIsCareOpen(false)}
      />

      <ShareExportModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
}
