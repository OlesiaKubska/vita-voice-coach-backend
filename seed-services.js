const fetch = require("node-fetch");
// import fetch from "node-fetch";

const API_URL = "http://localhost:1337/api/services";
const API_TOKEN =
  "a78706758333c2ba19923c6fa68b823b6683f605286d1159588965efa56ef34c1555c07fa7bc4145e183b869bced355e41b59d8d06ecb945fff3b75edced0d5f316ed14a4999c7e34daa6c94f0eece86f5cb2fdd86e28aa89e7b2a9f6f6fd09813dcf21ad8707ac461df60f68779c464d3dac59300cd78078222e83ab1d90457";

const services = [
  {
    title: "Indywidualne lekcje śpiewu",
    shortDescription:
      "Spersonalizowane sesje wokalne dla początkujących i zaawansowanych. Nauka techniki oddechu, emisji głosu i interpretacji utworów.",
    description:
      "Indywidualne lekcje śpiewu obejmują pracę nad techniką wokalną, emisją głosu, interpretacją utworów oraz kontrolą oddechu. Lekcje dostosowane są do poziomu uczestnika – od początkujących po profesjonalistów.",
    slug: "indywidualne-lekcje-spiewu",
    icon: "FaMicrophone",
    image: null,
    category: "Śpiew",
    highlight: true,
  },
  {
    title: "Warsztaty grupowe",
    shortDescription:
      "Spotkania w grupie, wspólne śpiewanie i budowanie pewności siebie na scenie.",
    description:
      "Warsztaty grupowe umożliwiają wspólne śpiewanie, wymianę doświadczeń i integrację uczestników. Oprócz ćwiczeń wokalnych skupiamy się na pewności siebie, radzeniu sobie ze stresem i współpracy w grupie.",
    slug: "warsztaty-grupowe",
    icon: "FaUsers",
    image: null,
    category: "Śpiew",
    highlight: true,
  },
  {
    title: "Rozwój osobisty przez śpiew",
    shortDescription:
      "Program łączący rozwój osobisty z technikami wokalnymi. Asertywność, pewność siebie i praca z emocjami.",
    description:
      "Śpiew to nie tylko muzyka – to także droga do lepszego poznania siebie. W ramach zajęć uczestnicy uczą się asertywności, pracy z emocjami i budowania pewności siebie poprzez techniki wokalne i pracę z głosem.",
    slug: "rozwoj-osobisty-przez-spiew",
    icon: "FaHeart",
    image: null,
    category: "Rozwój osobisty",
    highlight: true,
  },
  {
    title: "Przygotowanie do wystąpień publicznych",
    shortDescription:
      "Nauka pracy z tremą, dobór repertuaru, emisja głosu i skuteczna komunikacja z publicznością.",
    description:
      "Program obejmuje przygotowanie do przemówień, prezentacji i wystąpień artystycznych. Uczymy pracy z emocjami, dykcją, interpretacją tekstu oraz skutecznego kontaktu z publicznością.",
    slug: "przygotowanie-do-wystapien-publicznych",
    icon: "FaComments",
    image: null,
    category: "Wystąpienia publiczne",
    highlight: true,
  },
  {
    title: "Spotkania dla kobiet",
    shortDescription:
      "Warsztaty z elementami śpiewu i budowania wspólnoty. Bezpieczna przestrzeń dla kobiet, które chcą rozwijać głos i pewność siebie.",
    description:
      "Spotkania stworzone z myślą o kobietach. Zajęcia łączą elementy śpiewu, pracy z głosem i wzajemnego wsparcia. To przestrzeń, w której można rozwijać swoje umiejętności, dzielić się doświadczeniami i wzmacniać kobiecą wspólnotę.",
    slug: "spotkania-dla-kobiet",
    icon: "FaFemale",
    image: null,
    category: "Kobiety",
    highlight: true,
  },
  {
    title: "Nagrywanie i wydawanie muzyki",
    shortDescription:
      "Możliwość nagrania utworów i pracy nad własnym materiałem muzycznym.",
    description:
      "Oferujemy sesje nagraniowe, w ramach których uczniowie mogą utrwalić swoje osiągnięcia, nagrać własne interpretacje lub stworzyć autorską muzykę. To także możliwość przygotowania profesjonalnych nagrań do publikacji.",
    slug: "nagrywanie-i-wydawanie-muzyki",
    icon: "FaMusic",
    image: null,
    category: "Nagrania",
    highlight: true,
  },
  {
    title: "Trening głosu i komunikacji werbalnej",
    shortDescription:
      "Poprawa dykcji, modulacji głosu, intonacji i pewności w komunikacji.",
    description:
      "Trening skierowany do osób, które chcą poprawić swoje umiejętności komunikacyjne. Skupiamy się na pracy z oddechem, wyrazistością mowy, pewnością siebie podczas wystąpień i codziennych sytuacji komunikacyjnych.",
    slug: "trening-glosu-i-komunikacji-werbalnej",
    icon: "FaMicrophoneAlt",
    image: null,
    category: "Wystąpienia publiczne",
    highlight: true,
  },
  {
    title: "Szkolenia dla polityków",
    shortDescription:
      "Praca z głosem, dykcją i przemówieniami publicznymi dla polityków i liderów.",
    description:
      "Program dostosowany do osób aktywnych publicznie – polityków, liderów i działaczy społecznych. Skupiamy się na poprawie dykcji, budowaniu autorytetu poprzez głos i skutecznym przekazie treści.",
    slug: "szkolenia-dla-politykow",
    icon: "FaLandmark",
    image: null,
    category: "Wystąpienia publiczne",
    highlight: true,
  },
  {
    title: "Warsztaty dla korporacji",
    shortDescription:
      "Zajęcia dla zespołów firmowych z komunikacji, wystąpień i pracy głosem.",
    description:
      "Warsztaty dla firm skupiają się na umiejętności jasnego komunikowania się, pracy zespołowej i radzenia sobie z tremą podczas prezentacji. To doskonałe narzędzie do wzmacniania zespołów.",
    slug: "warsztaty-dla-korporacji",
    icon: "FaBuilding",
    image: null,
    category: "Korporacje",
    highlight: true,
  },
  {
    title: "Warsztaty dla młodzieży",
    shortDescription:
      "Zajęcia dla uczniów i studentów – śpiew, komunikacja i wystąpienia publiczne.",
    description:
      "Specjalne warsztaty skierowane do młodych osób. Pomagają rozwijać pewność siebie, kreatywność i umiejętność wyrażania siebie poprzez śpiew i wystąpienia publiczne.",
    slug: "warsztaty-dla-mlodziezy",
    icon: "FaUserGraduate",
    image: null,
    category: "Młodzież",
    highlight: true,
  },
  {
    title: "Kursy online",
    shortDescription:
      "Zajęcia dostępne zdalnie – śpiew, dykcja i wystąpienia publiczne.",
    description:
      "Kursy online pozwalają na naukę śpiewu, technik komunikacyjnych i emisji głosu bez wychodzenia z domu. Idealne rozwiązanie dla osób, które chcą pracować w elastycznym trybie.",
    slug: "kursy-online",
    icon: "FaLaptop",
    image: null,
    category: "Online",
    highlight: true,
  },
  {
    title: "Sesje nagrań i audycje",
    shortDescription: "Profesjonalne sesje nagraniowe dla głosu i muzyki.",
    description:
      "Oferujemy nagrania wokalne i lektorskie, które mogą być wykorzystywane w pracy zawodowej lub prywatnej. To także okazja do stworzenia własnych audycji i podcastów.",
    slug: "sesje-nagran-i-audycje",
    icon: "FaPodcast",
    image: null,
    category: "Nagrania",
    highlight: true,
  },
];

async function seed() {
  for (const service of services) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ data: service }),
    });

    const data = await res.json();
    console.log("✅ Created:", data);
  }
}

seed();
