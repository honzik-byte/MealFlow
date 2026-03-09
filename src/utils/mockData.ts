import type { Meal } from '../store/types';

// Simple mock DB of meals to replace or generate from
export const MOCK_MEALS: Meal[] = [
    { id: '1', name: 'Řecký jogurt s ovesnými vločkami', type: 'breakfast', ingredients: ['Řecký jogurt 0% (200g)', 'Ovesné vločky (50g)', 'Banán (100g)', 'Arašídové máslo (20g)'], calories: 450, protein: 25, carbs: 55, fats: 14, preparationNode: '1. Do misky dejte řecký jogurt.\n2. Zasypte ovesnými vločkami a přidejte na kolečka nakrájený banán.\n3. Navrch přidejte lžičku arašídového másla pro zdravé tuky.\n4. Můžete dosladit kapkou čekankového sirupu nebo medu.', isCompleted: false },
    { id: '2', name: 'Vaječná omeleta', type: 'breakfast', ingredients: ['Vejce (3 ks / 150g)', 'Tvrdý sýr 30% (30g)', 'Libová šunka (50g)', 'Zelenina - rajčata/paprika (150g)', 'Olivový olej (5g)'], calories: 400, protein: 30, carbs: 10, fats: 26, preparationNode: '1. Rozklepněte vejce do misky, přidejte sůl, pepř a rozšlehejte vidličkou.\n2. Na lžičce olivového oleje orestujte nakrájenou šunku.\n3. Vylijte vejce na pánev a posypte nastrouhaným sýrem.\n4. Přehněte napůl a podávejte s čerstvou zeleninou.', isCompleted: false },
    { id: '3', name: 'Tvarohová miska s ovocem', type: 'breakfast', ingredients: ['Polotučný tvaroh (250g)', 'Jahody (150g)', 'Med (15g)', 'Chia semínka (10g)'], calories: 350, protein: 25, carbs: 45, fats: 8, preparationNode: '1. Tvaroh rozmíchejte v misce (můžete přidat trochu mléka pro jemnější strukturu).\n2. Přidejte nakrájené čerstvé jahody.\n3. Oslaďte lžičkou medu a posypte lžičkou chia semínek.', isCompleted: false },

    { id: '4', name: 'Kuřecí prsa s rýží a zeleninou', type: 'lunch', ingredients: ['Kuřecí prsa (150g v syrovém stavu)', 'Rýže basmati (80g v syrovém stavu)', 'Brokolice (150g)', 'Olivový olej (10g)'], calories: 600, protein: 45, carbs: 70, fats: 15, preparationNode: '1. Kuřecí maso nakrájejte na kostky, osolte, opepřete a posypte sladkou paprikou.\n2. Opečte na lžičce oleje dozlatova.\n3. Rýži uvařte podle návodu.\n4. Brokolici uvařte v páře do křupava. Vše servírujte na jeden talíř.', isCompleted: false },
    { id: '5', name: 'Těstovino-tuňákový salát', type: 'lunch', ingredients: ['Celozrnné těstoviny (70g v syrovém stavu)', 'Tuňák ve vlastní šťávě (120g pevného podílu)', 'Kukuřice sterilovaná (50g)', 'Majonéza light (30g)'], calories: 550, protein: 35, carbs: 65, fats: 16, preparationNode: '1. Uvařte celozrnné těstoviny al dente a nechte vychladnout.\n2. Slejte šťávu z tuňáka a přidejte maso k těstovinám.\n3. Přisypte kukuřici, osolte, opepřete.\n4. Spojte lžící light majonézy nebo bílého jogurtu.', isCompleted: false },
    { id: '6', name: 'Tofu miska s quinoou', type: 'lunch', ingredients: ['Uzené tofu (150g)', 'Quinoa (70g v syrovém stavu)', 'Avokádo (50g)', 'Zelenina dle chuti (200g)'], calories: 500, protein: 25, carbs: 55, fats: 20, preparationNode: '1. Quinou důkladně propláchněte a uvařte v osolené vodě v poměru 1:2 (quinoa:voda) asi 15 minut.\n2. Uzené tofu nakrájejte na kostičky a zprudka opečte na pánvi, dokud nezezlátne.\n3. Avokádo nakrájejte na plátky.\n4. Do misky naaranžujte uvařenou quinou, opečené tofu, čerstvou zeleninu (např. rajčata, paprika) a navrch dejte plátky avokáda. Zakápněte citrónovou šťávou.', isCompleted: false },

    { id: '7', name: 'Losos s bramborem', type: 'dinner', ingredients: ['Losos filet (150g)', 'Brambory (200g)', 'Listový salát (100g)', 'Olivový olej (5g)'], calories: 550, protein: 35, carbs: 40, fats: 27, preparationNode: '1. Brambory omyjte, nakrájejte na klínky a dejte péct do trouby na 200°C cca 25 minut.\n2. Filet lososa osolte, pokapejte citrónem a opečte na pánvi kůží dolů (asi 4 minuty z každé strany).\n3. Listový salát smíchejte se zálivkou z lžičky olivového oleje a balsamica. Podávejte společně.', isCompleted: false },
    { id: '8', name: 'Krůtí wrap', type: 'dinner', ingredients: ['Celozrnná tortilla (1 ks / 60g)', 'Krůtí šunka nejvyšší jakosti (100g)', 'Sýr žervé (40g)', 'Rukola (30g)', 'Rajče (100g)'], calories: 400, protein: 28, carbs: 45, fats: 12, preparationNode: '1. Celozrnnou tortillu lehce nahřejte na suché pánvi, aby byla ohebnější.\n2. Pomažte ji tenkou vrstvou sýru žervé.\n3. Naskládejte plátky krůtí šunky, hrst čerstvé rukoly a na plátky nakrájené rajče.\n4. Pevně zaviňte, překrojte napůl a podávejte (lze ještě krátce zapéct v kontaktním grilu).', isCompleted: false },
    { id: '9', name: 'Čočkový dhal', type: 'dinner', ingredients: ['Červená čočka (70g v syrovém stavu)', 'Kokosové mléko light (100ml)', 'Krájená rajčata v konzervě (150g)', 'Kari koření, cibule (50g)', 'Řepkový olej (5g)'], calories: 450, protein: 20, carbs: 60, fats: 14, preparationNode: '1. Na cibulce a trošce oleje orestujte kari koření, kurkumu a česnek.\n2. Přidejte propláchnutou červenou čočku a podlijte krájenými rajčaty z plechovky a trochou vody.\n3. Vařte do změknutí (cca 15-20 min).\n4. Nakonec zjemněte trochou kokosového mléka, osolte a posypte čerstvým koriandrem.', isCompleted: false },

    { id: '10', name: 'Proteinový šejk a banán', type: 'snack', ingredients: ['Syrovátkový protein (30g)', 'Polotučné mléko (200ml)', 'Banán (1 střední / 120g)'], calories: 250, protein: 25, carbs: 32, fats: 2, preparationNode: '1. Do šejkru odměřte jednu odměrku vašeho oblíbeného syrovátkového proteinu (např. čokoládový nebo vanilkový).\n2. Přilijte 250 ml vody nebo polotučného mléka.\n3. Důkladně protřepejte, aby se rozpustily hrudky.\n4. Konzumujte s jedním středním banánem.', isCompleted: false },
    { id: '11', name: 'Cottage sýr a knäckebrot', type: 'snack', ingredients: ['Sýr Cottage (150g)', 'Žitný knäckebrot (3 plátky / 30g)', 'Rajče (150g)'], calories: 300, protein: 20, carbs: 35, fats: 9, preparationNode: '1. Do misky vysypte kelímek kvalitního sýru Cottage a jemně ho osolte a opepřete.\n2. Rajče nakrájejte na tenké plátky.\n3. Knäckebroty můžete nechat suché a přikusovat, nebo na ně Cottage s rajčetem přímo namazat.', isCompleted: false },
    { id: '12', name: 'Hrst ořechů a jablko', type: 'snack', ingredients: ['Mandle nebo vlašské ořechy (20g)', 'Jablko (1 střední / 150g)'], calories: 200, protein: 5, carbs: 20, fats: 11, preparationNode: '1. Omyjte si a nakrájejte jedno středně velké jablko na dílky.\n2. Připravte si menší hrstku nesolených a nepražených ořechů (cca 20 g mandlí nebo vlašských ořechů).\n3. Jednoduchá a rychlá svačina, nevyžaduje žádnou další přípravu.', isCompleted: false }
];

export const generateMealPlan = (_calorieTarget: number, _proteinTarget: number, mealsPerDay: number): Meal[] => {
    // Simple logic to fetch meals. For a real app this would filter by macro split.
    // We'll aim to roughly hit targets by selecting from categories.

    const selected: Meal[] = [];

    // 3 meals: breakfast, lunch, dinner
    // 4 meals: + 1 snack
    // 5 meals: + 2 snacks (we just duplicate a snack or pick another)

    const breakfasts = MOCK_MEALS.filter(m => m.type === 'breakfast');
    const lunches = MOCK_MEALS.filter(m => m.type === 'lunch');
    const dinners = MOCK_MEALS.filter(m => m.type === 'dinner');
    const snacks = MOCK_MEALS.filter(m => m.type === 'snack');

    const randomPick = (arr: Meal[]) => arr[Math.floor(Math.random() * arr.length)];

    selected.push({ ...randomPick(breakfasts), id: Date.now() + '-1' });
    selected.push({ ...randomPick(lunches), id: Date.now() + '-2' });
    selected.push({ ...randomPick(dinners), id: Date.now() + '-3' });

    if (mealsPerDay >= 4) {
        selected.push({ ...randomPick(snacks), id: Date.now() + '-4' });
    }
    if (mealsPerDay === 5) {
        // just pick another unique snack if possible
        selected.push({ ...snacks[(Math.floor(Math.random() * snacks.length) + 1) % snacks.length], id: Date.now() + '-5' });
    }

    return selected;
};

export const getReplacementMeals = (originalMeal: Meal): Meal[] => {
    return MOCK_MEALS.filter(m => m.type === originalMeal.type && m.name !== originalMeal.name).slice(0, 3);
};
