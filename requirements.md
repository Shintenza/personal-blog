# Wymagania techniczne
## Wykorzystanie Node.js i Express.js
1. Struktura aplikacji:
    - w przypadku backendu podział na osobne foldery dla \textit{middleware, routera, controllera, utils} czy dla \textit{modeli}
    - struktura dla frontendu jest narzucona przez Next jeśli chodzi o folder \textit{app}, dodatkowo podział na osobny folder dla komponentów, styli czy użytecznych funkcji
2. Routing i middleware: patrz folder \textit{routes} i \textit{middleware}
3. Obsługa błędów: zapytania robione zarówno przez backend, jak i frontend używają konstrukcji \textit{try/catch}
4. Integracja z Node.js: serwer zapisuje pliki przesyłane przez usera na dysku do czego są wykorzystywane wbudowane w Node.js funkcje (patrz np. `createUploadsDir.js`)
5. Zgodność z dokumentacją: kod był pisany zgodnie z dobrymi praktykami, a także samą dokumentacją

## Baza danych
1. Wybór i integracja bazy danych: w projekcie korzystam z MongoDB za pośrednictwem popularnego pakietu `Mongoose`.
2. Modelowanie danych: patrz folder `models` dla backendu
3. Operacje CRUD: te można znaleźć w folderze `controllers`; wykorzystano operacje dodawania, aktualizowania, usuwania i pobierania danych.
4. Zoptymalizowane zapytania do bazy danych: aby ograniczyć obciążenie bazy danych podczas wyszukiwania artykułu po nazwie użełem pakietu `use-debounce` (frontend), 
który sprawia, że zapytanie nie następuje przy każdym naciśnięciu klawisza. Jeśli chodzi o optymalizację samych zapytań to spora część jest ogarnięta przez `Mongoose`.


# Wymagania funkcjonalne
## Rejestracja i logowanie
1. Authentication: wykorzystanie JWT (jsonwebtoken); użytkownik wymienia się z serwerem tokenem, który jednoznacznie go identyfikuje
2. Hashowanie haseł: hasła w bazie danych są hashowane z użyciem `bcrypt.js`
3. Walidacja danych: dane przesyłane przez formularze związane z artykułami są walidowane przez samą bazę danych, która ma dobrze zdefiniowane, które pola są poprawne (patrz model). 
Poprawność danych sprawdzana jest zarówno po stronie frontendu, jak i backendu
4. Transakcyjność: całe operacje dodawania/usuwania/aktualizowania są przeprowadzane w ramach jednego bloku try i catch więc w razie błędu nie zostanie zapisana tylko część danych
5. Feedback dla użytkownika: formularze są kontrolowane przez Reactowy stan przez co można na bierząco informować użytkownika o błedach (patrz np. `ArticleForm.jsx`); dodatakowo wysyłane są mu komunikaty np.
o błedach serwera (500) itd. Ładowanie jest signalizowane przez spinnery.

Endpoint od rejestrowania jest dostępny, ale nie jest używany przez frontend z racji, że apka jest blogiem więc artykuły raczej pisze jedna osoba (więc więcej kont nie jest potrzebne).
Rejestrowanie może się przydać w przyszłości gdy np. zostaną dodane komentarze.

## Wyszukiwanie danych:
1. Implementacja wyszukiwania: na frontendzie ogarnięta przez `searchParams` (patrz `Search.jsx`, `/app/(blog)/page.jsx`), na backendzie specjalny endpoint (funkcja 
`getArticles` w `articleController.js`)
2. Optymalizacja wyszukiwania: wcześniej wspomniany debouncing z użyciem `use-debounce`
3. Intuicyjny interfejs wyszukiwania: input z placeholderem dającym do zrozumienia, że wpisanie czegoś spowoduje przefiltrowanie artykułów (patrz strona główna, `Search.jsx`)
4. Dokładność wyników: korzystam z dopasowania z użyciem regex (wbudowany w `MongoDB/Mongoose`) niezależnie od wielkości liter (poniżej fragment funkcji `getArticles`)
```
    const articles = await Article.find(
      searchQuery.length > 0
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
    )
```

## UX/UI
- dostępność: stosowanie stosownych semantycznych tagów jak `main`, `nav`, `article`
- responsywność: apka jest responsywna 
- estetyka: jednolity motyw kolorystyczny, nowoczesny wygląd
