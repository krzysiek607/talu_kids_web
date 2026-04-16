export const SITE_CONFIG = {
  name: "TaLu Kids",
  tagline: "Partner Twojego Dziecka",
  description:
    "Aplikacja edukacyjna dla dzieci 4-8 lat. Gry, zabawy, bajki i rozwoj przez zabawę z wirtualnym zwierzakiem.",
  url: "https://talukids.pl",
  email: "kontakt@talukids.pl",
  ageRange: "4-8 lat",
  copyright: `© ${new Date().getFullYear()} TaLu Kids. Wszelkie prawa zastrzeżone.`,
} as const

export const NAV_LINKS = [
  { label: "Funkcje", href: "#funkcje" },
  { label: "Jak to działa", href: "#jak-to-dziala" },
  { label: "Przewodnicy", href: "#przewodnicy" },
  { label: "Dla rodziców", href: "#dla-rodzicow" },
  { label: "FAQ", href: "#faq" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
] as const

export const FEATURES = [
  {
    title: "20+ gier edukacyjnych",
    description:
      "Labirynty, dopasowywanie, liczenie, szlaczki, platformówki i wiele więcej. Gry rozwijają logiczne myślenie, pamięć i zdolności manualne — dostosowane do wieku dziecka.",
    icon: "GameController" as const,
    color: "pink" as const,
  },
  {
    title: "Nauka pisania liter",
    description:
      "Cały polski alfabet od A do Ż z systemem waypointów. Dziecko śledzi literki palcem i zdobywa nagrody za każdą opanowaną.",
    icon: "PencilLine" as const,
    color: "teal" as const,
  },
  {
    title: "5 magicznych zwierzaków",
    description:
      "Opiekuj się jajkiem, a po wykluciu wybierz jednego z 5 zwierzaków: Kryształka, Gryfonka, Smoczka, Jednorożca lub Feniksika! Karm, myj i baw się ze swoim pupilem.",
    icon: "Heart" as const,
    color: "purple" as const,
  },
  {
    title: "Tryb Przygoda",
    description:
      "11 rozdziałów fabularnej przygody z Taro i Lumi. Podróżuj przez miasto, szkołę i magiczne krainy, rozwiązując zadania i zbierając gwiazdki.",
    icon: "BookOpen" as const,
    color: "orange" as const,
  },
  {
    title: "Rozwój kreatywności",
    description:
      "Rysowanie, szlaczki, kolorowanki i zadania twórcze. 8 narzędzi malarskich, eksport do galerii i dzielenie się rysunkami z bliskimi.",
    icon: "Palette" as const,
    color: "yellow" as const,
  },
  {
    title: "Bezpieczna przestrzeń",
    description:
      "Zero reklam, zero ukrytych płatności. Kontrola rodzicielska z bramką 4-sekundową. Pełna zgodność z RODO i COPPA. Działa offline — idealna na podróże!",
    icon: "ShieldCheck" as const,
    color: "green" as const,
  },
] as const

export const EVOLUTION_STEPS = [
  {
    image: "/images/eggs/egg.webp",
    title: "Opiekuj się",
    description:
      "Karm, myj i baw się ze swoim jajkiem. Ono potrzebuje miłości, żeby rosnąć!",
    color: "yellow" as const,
  },
  {
    image: "/images/eggs/firstCrack.webp",
    title: "Ucz się",
    description:
      "Rozwiązuj zadania edukacyjne, aby zdobywać magiczną energię potrzebną do wyklucia.",
    color: "teal" as const,
  },
  {
    image: "/images/eggs/secondCrack.webp",
    title: "Wykluwaj!",
    description:
      "Zobacz moment pęknięcia skorupki — z jajka wykluwa się magiczne stworzenie!",
    color: "purple" as const,
  },
  {
    image: "/images/eggs/hatched.webp",
    title: "Wybierz zwierzaka",
    description:
      "Kryształek, Gryfonek, Smoczek, Jednorożec czy Feniksik? Wybór należy do Twojego dziecka!",
    color: "pink" as const,
  },
] as const

export const TESTIMONIALS = [
  {
    name: "Anna K.",
    role: "Mama 5-latka",
    text: "Maks sam prosi o \u201Ete gry z jajkiem\u201D. Nie wierzyłam, że nauka liter może być tak wciągająca. Po 2 tygodniach zna już cały alfabet!",
    avatar: "AK",
    rating: 5,
  },
  {
    name: "Tomek W.",
    role: "Tata 6-latki",
    text: "Wreszcie aplikacja bez reklam i irytujących powiadomień. Zuzia uwielbia rysowanie szlaczków, a ja mam spokój, że jest bezpieczna.",
    avatar: "TW",
    rating: 5,
  },
  {
    name: "Marta D.",
    role: "Mama 4-latka i 7-latki",
    text: "Obie córki uwielbiają TaLu Kids, mimo różnicy wieku. Starsza pomaga młodszej opiekować się nad zwierzakiem. Cudowne!",
    avatar: "MD",
    rating: 5,
  },
] as const

export const FAQ_ITEMS = [
  {
    question: "Dla jakiego wieku jest TaLu Kids?",
    answer:
      "TaLu Kids jest zaprojektowane dla dzieci w wieku 4-8 lat. Zadania są dostosowane do poziomu rozwoju dziecka i stopniowo się utrudniają. Młodsze dzieci (4-5 lat) mogą skupić się na rysowaniu i prostych grach, a starsze (6-8 lat) na nauce pisania liter i bardziej zaawansowanych zagadkach logicznych.",
  },
  {
    question: "Czy aplikacja jest bezpieczna dla mojego dziecka?",
    answer:
      "Absolutnie! Nie ma żadnych reklam, ukrytych płatności ani linków zewnętrznych. Aplikacja jest w pełni zgodna z RODO i COPPA. Panel rodzica jest chroniony 4-sekundową bramką bezpieczeństwa. Wszystkie dane są szyfrowane, a dziecko nie ma dostępu do żadnych funkcji wymagających kontaktu z innymi użytkownikami.",
  },
  {
    question: "Jak działa system zwierzaka?",
    answer:
      "Dziecko otrzymuje magiczne jajko, które ewoluuje w miarę nauki. Karmienie, mycie i zabawa z jajkiem to codzienne aktywności, a rozwiązywanie zadań edukacyjnych daje energię do wyklucia. Po wykluciu dziecko wybiera jednego z 5 magicznych zwierzaków: Kryształka, Gryfonka, Smoczka, Jednorożca lub Feniksika! Zwierzak mruga, unosi się i reaguje na opiekę.",
  },
  {
    question: "Na jakich urządzeniach działa aplikacja?",
    answer:
      "TaLu Kids działa na telefonach i tabletach z Androidem oraz iOS. Aplikacja jest zoptymalizowana pod tablety – idealne do nauki pisania palcem po ekranie.",
  },
  {
    question: "Czy mogę śledzić postępy mojego dziecka?",
    answer:
      "Tak! W ustawieniach aplikacji możesz połączyć konto rodzica, podając swój email i hasło. Następnie zaloguj się na talukids.pl/panel-rodzica — zobaczysz statystyki gier, aktywność z ostatnich 7 dni, zebrane nagrody i ulubione gry dziecka. Wszystko dostępne z telefonu, tabletu lub komputera.",
  },
  {
    question: "Czym jest tryb Przygoda?",
    answer:
      "Tryb Przygoda to fabularna podróż przez 11 rozdziałów z Taro i Lumi. Dziecko podróżuje od domu, przez szkołę i sklep, aż do magicznych krain — Ognistej Doliny, Złotej Świątyni, Wietrznych Szczytów, Tęczowej Łąki i Kryształowej Jaskini. Po drodze rozwiązuje zadania edukacyjne, gra w minigry i zbiera gwiazdki odblokowujące kolejne rozdziały.",
  },
  {
    question: "Ile kosztuje TaLu Kids?",
    answer:
      "Podstawowa wersja aplikacji jest darmowa i zawiera gry edukacyjne, naukę liter i opiekę nad zwierzakiem. Wersja TaLu+ Premium daje nielimitowane nagrody i dostęp do wszystkich funkcji. Subskrypcja jest dostępna w planie miesięcznym (19,99 zł) i rocznym (99,99 zł).",
  },
  {
    question: "Czy moje dziecko może korzystać z aplikacji offline?",
    answer:
      "Tak! TaLu Kids działa w pełni offline po pobraniu. Wszystkie gry edukacyjne, nauka pisania liter i zabawa ze zwierzakiem są dostępne bez połączenia z internetem. To idealne rozwiązanie na podróże samochodem, loty samolotem czy miejsca bez zasięgu Wi-Fi.",
  },
  {
    question: "Ile czasu dziennie moje dziecko powinno spędzać w aplikacji?",
    answer:
      "Rekomendujemy 15-30 minut dziennie – to optymalny czas nauki przez zabawę dla dzieci w wieku 4-8 lat. Panel rodzica pozwala ustawić limity czasu, a system nagród motywuje do regularnych, krótkich sesji zamiast długiego siedzenia przy ekranie. Dzięki temu TaLu Kids wspiera zdrowe nawyki korzystania z technologii.",
  },
  {
    question: "Jak TaLu Kids uczy moje dziecko? Jaka jest metodologia?",
    answer:
      "TaLu Kids opiera się na metodzie nauki przez zabawę (game-based learning). Każda gra rozwija konkretne umiejętności: logiczne myślenie, rozpoznawanie wzorców, koordynację ręka-oko i znajomość alfabetu. System zwierzaka dodaje element motywacji – dziecko uczy się, by pomagać swojemu pupilowi rosnąć. Trudność zadań dostosowuje się automatycznie do poziomu dziecka.",
  },
  {
    question: "Czy z aplikacji może korzystać więcej niż jedno dziecko?",
    answer:
      "Obecnie TaLu Kids obsługuje jeden profil dziecka na urządzeniu. Pracujemy nad funkcją wielu profili, która pozwoli każdemu dziecku mieć własnego zwierzaka i osobne postępy. Jeśli masz więcej dzieci, mogą na razie korzystać na osobnych urządzeniach.",
  },
  {
    question: "Co wyróżnia TaLu Kids na tle innych aplikacji edukacyjnych?",
    answer:
      "TaLu Kids łączy edukację z emocjonalnym zaangażowaniem dzięki systemowi wirtualnego zwierzaka. Zamiast suchych ćwiczeń, dziecko uczy się, by pomagać swojemu pupilowi ewoluować i wykluć jednego z 5 magicznych zwierzaków. 20+ gier, tryb Przygoda z 11 rozdziałami, polski alfabet od A do Ż i pełna zgodność z RODO i COPPA. Stworzone przez rodziców, dla rodziców.",
  },
  {
    question: "Jakie dane zbiera aplikacja i jak są chronione?",
    answer:
      "TaLu Kids zbiera minimalną ilość danych – tylko to, co niezbędne do działania aplikacji i śledzenia postępów. Nie zbieramy danych osobowych dzieci takich jak imię, zdjęcie czy lokalizacja. Wszystkie dane są szyfrowane (TLS 1.3, AES-256) i przechowywane zgodnie z RODO. Jako rodzic masz pełne prawo do wglądu, eksportu i usunięcia danych w dowolnym momencie.",
  },
] as const
