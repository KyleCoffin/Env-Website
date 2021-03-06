import React from 'react';

import GenericCostsPage from './GenericCostsPage';
import steel from './steel/steel-json';
import aluminum from './aluminum/aluminum-json';

import BbqHoc from './bbq/BbqHoc';
import BitcoinHoc from './bitcoin/BitcoinHoc';
import BooksHoc from './books/BooksHoc';
import CarHoc from './car/CarHoc';
import ClothesHoc from './clothes/ClothesHoc';
import ComputerHoc from './computer/ComputerHoc';
import CupHoc from './cup/CupHoc';
import FurnitureHoc from './furniture/FurnitureHoc';
import GarbageHoc from './garbage/GarbageHoc';
import HomeHoc from './home/HomeHoc';
import PackageHoc from './package/PackageHoc';
import PetHoc from './pet/PetHoc';
import SteakHoc from './steak/SteakHoc';
import TabletHoc from './tablet/TabletHoc'; // Replaced by COmputerHoc
import TvHoc from './tv/TvHoc';


export default {
    aluminum: <GenericCostsPage {...aluminum} />,
    apartment: <HomeHoc />,
    bbq: <BbqHoc />,
    bitcoin: <BitcoinHoc />,
    books: <BooksHoc />,
    car: <CarHoc />,
    cat: <PetHoc />,
    clothes: <ClothesHoc />,
    dog: <PetHoc />,
    desktop: <ComputerHoc />,
    computer: <ComputerHoc />,
    cup: <CupHoc />,
    garbage: <GarbageHoc />,
    home: <HomeHoc />,
    hamster: <PetHoc />,
    iphone: <ComputerHoc />,
    furniture: <FurnitureHoc />,
    laptop: <ComputerHoc />,
    package: <PackageHoc />,
    pet: <PetHoc />,
    steak: <SteakHoc />,
    steel: <GenericCostsPage {...steel} />,
    tablet: <ComputerHoc />,
    tv: <TvHoc />,
};
