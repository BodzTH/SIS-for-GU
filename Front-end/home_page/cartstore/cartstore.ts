import { create } from "zustand";
import axios from "axios";
import { useEffect } from "react";

// Function to fetch data from the API using async/await
let fetchedData: any = [];

export async function fetchBooks(): Promise<any> {
  try {
    const response = await axios.get<any[]>(
      "http://localhost:5030/api/getAllBooks"
    ); // Replace '/api/quantity' with your API endpoint
    fetchedData = response.data;
    return response.data;
  } catch (error) {
    console.error("Error fetching quantity:", error);
    throw error;
  }
}

export async function fetchDeletedBooks(): Promise<any> {
  try {
    const response = await axios.get<any[]>(
      "http://localhost:5030/api/getDeletedBook"
    ); // Replace '/api/quantity' with your API endpoint

    // Iterate through local storage items
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === `addedToShelf-${response}`) {
        localStorage.removeItem(key);
        break; // Exit the loop after deleting the item
      }
    }

    // Rest of the code...
  } catch (error) {
    console.error("Error fetching quantity:", error);
    throw error;
  }
}

export async function fetchQuantity(): Promise<number> {
  try {
    const response = await axios.get<number>(
      "http://localhost:5030/api/getTotalQuantity"
    ); // Replace '/api/quantity' with your API endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching quantity:", error);
    throw error;
  }
}

type Store = {
  bookscard: any;
  count: number;
  incart: number;
};

const useStore = create<Store>()((set) => ({
  count: 0,
  bookscard: fetchedData,
  incart: 0,
}));

export const getBookByID = (id: number) => {
  return fetchedData.find((book: { id: any }) => book.id === id);
};

export const getBooksByCategory = (category: string) => {
  return fetchedData.filter(
    (book: { categori: string }) => book.categori === category
  );
};

export const getCategories = () => {
  const categoriesSet = new Set();
  fetchedData.forEach((book: any) => categoriesSet.add(book.categori));
  return Array.from(categoriesSet);
};

export const getBooksBySearchQuery = (searchQuery: string) => {
  const lowerCaseSearchQuery = searchQuery.toLowerCase();
  const searchQueryAsNumber = Number(searchQuery);
  return fetchedData.filter(
    (book: {
      SKU: number;
      BookName: string | string[];
      categori: string | string[];
    }) => {
      const lowerCaseBookName = Array.isArray(book.BookName)
        ? book.BookName.map((name) => name.toLowerCase())
        : book.BookName.toLowerCase();
      const lowerCaseCategori = Array.isArray(book.categori)
        ? book.categori.map((categori) => categori.toLowerCase())
        : book.categori.toLowerCase();
      return (
        lowerCaseBookName.includes(lowerCaseSearchQuery) ||
        lowerCaseCategori.includes(lowerCaseSearchQuery) ||
        book.SKU === searchQueryAsNumber
      );
    }
  );
};

export const getBooksTOCart = () => {
  const bookSet = new Set();
  fetchedData.forEach((id: { id: unknown }) => bookSet.add(id.id));
  return Array.from(bookSet);
};

export function priceFormating(price: number) {
  let formatPrice = (price / 100).toFixed(2);
  return formatPrice;
}

export function getInStockById(id: number) {
  const book = fetchedData.find((book: { id: number }) => book.id === id);
  return book ? book.inStock : 0;
}

export default useStore;
