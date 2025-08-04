import { type TravelPlan, type DayPlan, type TouristSpot } from './types'
import { allCountries } from '@/lib/countries'

// 大陸別観光地テンプレート
const continentSpots = {
  Asia: {
    spots: [
      { name: '古代寺院', nameLocal: 'Ancient Temple', type: 'historical' },
      { name: '伝統市場', nameLocal: 'Traditional Market', type: 'cultural' },
      { name: '皇宮・宮殿', nameLocal: 'Imperial Palace', type: 'historical' },
      { name: '国立博物館', nameLocal: 'National Museum', type: 'museum' },
      { name: '禅庭園', nameLocal: 'Zen Garden', type: 'nature' },
      { name: '温泉地', nameLocal: 'Hot Springs', type: 'nature' },
      { name: '茶屋', nameLocal: 'Tea House', type: 'cafe' }
    ],
    transportation: ['train', 'bus', 'taxi', 'walking']
  },
  Europe: {
    spots: [
      { name: '歴史的大聖堂', nameLocal: 'Historic Cathedral', type: 'historical' },
      { name: '旧市街', nameLocal: 'Old Town', type: 'cultural' },
      { name: '城・宮殿', nameLocal: 'Castle/Palace', type: 'historical' },
      { name: '美術館', nameLocal: 'Art Museum', type: 'museum' },
      { name: '中央公園', nameLocal: 'Central Park', type: 'nature' },
      { name: 'ワイナリー', nameLocal: 'Winery', type: 'cultural' },
      { name: 'カフェ・ビストロ', nameLocal: 'Café Bistro', type: 'cafe' }
    ],
    transportation: ['train', 'bus', 'walking', 'car']
  },
  Africa: {
    spots: [
      { name: '国立公園', nameLocal: 'National Park', type: 'nature' },
      { name: '伝統村落', nameLocal: 'Traditional Village', type: 'cultural' },
      { name: '古代遺跡', nameLocal: 'Ancient Ruins', type: 'historical' },
      { name: '文化センター', nameLocal: 'Cultural Center', type: 'museum' },
      { name: 'サバンナ', nameLocal: 'Savanna', type: 'nature' },
      { name: '手工芸市場', nameLocal: 'Craft Market', type: 'cultural' },
      { name: 'ロッジ', nameLocal: 'Safari Lodge', type: 'cafe' }
    ],
    transportation: ['car', 'bus', 'walking', 'taxi']
  },
  'North America': {
    spots: [
      { name: '国立記念碑', nameLocal: 'National Monument', type: 'historical' },
      { name: 'ダウンタウン', nameLocal: 'Downtown District', type: 'cultural' },
      { name: '歴史博物館', nameLocal: 'History Museum', type: 'museum' },
      { name: '都市公園', nameLocal: 'City Park', type: 'nature' },
      { name: '展望台', nameLocal: 'Observation Deck', type: 'nature' },
      { name: 'フードマーケット', nameLocal: 'Food Market', type: 'cultural' },
      { name: 'コーヒーショップ', nameLocal: 'Coffee Shop', type: 'cafe' }
    ],
    transportation: ['car', 'bus', 'taxi', 'walking']
  },
  'South America': {
    spots: [
      { name: '古代文明遺跡', nameLocal: 'Ancient Civilization Site', type: 'historical' },
      { name: '植民地建築', nameLocal: 'Colonial Architecture', type: 'cultural' },
      { name: '考古学博物館', nameLocal: 'Archaeological Museum', type: 'museum' },
      { name: '熱帯雨林', nameLocal: 'Rainforest', type: 'nature' },
      { name: '火山・山岳', nameLocal: 'Volcano/Mountains', type: 'nature' },
      { name: 'アルティザンマーケット', nameLocal: 'Artisan Market', type: 'cultural' },
      { name: 'カフェテリア', nameLocal: 'Cafetería', type: 'cafe' }
    ],
    transportation: ['bus', 'car', 'taxi', 'walking']
  },
  Oceania: {
    spots: [
      { name: 'ビーチリゾート', nameLocal: 'Beach Resort', type: 'nature' },
      { name: '先住民文化センター', nameLocal: 'Indigenous Cultural Center', type: 'cultural' },
      { name: '海洋博物館', nameLocal: 'Marine Museum', type: 'museum' },
      { name: '国立公園', nameLocal: 'National Park', type: 'nature' },
      { name: 'サンゴ礁', nameLocal: 'Coral Reef', type: 'nature' },
      { name: 'フィッシュマーケット', nameLocal: 'Fish Market', type: 'cultural' },
      { name: 'ビーチカフェ', nameLocal: 'Beach Café', type: 'cafe' }
    ],
    transportation: ['car', 'bus', 'walking', 'taxi']
  }
}

// 国別特別スポット（有名な国のみ）
const countrySpecificSpots: Record<string, TouristSpot[]> = {
  jp: [
    { id: 'fushimi-inari', name: '伏見稲荷大社', nameLocal: 'Fushimi Inari Shrine', culturalSignificance: '千本鳥居で有名な神社です。', phrases: [], duration: 120, position: { lat: 34.9671, lng: 135.7727 } },
    { id: 'kiyomizu', name: '清水寺', nameLocal: 'Kiyomizu-dera Temple', culturalSignificance: '京都の象徴的な寺院です。', phrases: [], duration: 90, position: { lat: 34.9949, lng: 135.7851 } },
    { id: 'tsukiji', name: '築地市場', nameLocal: 'Tsukiji Market', culturalSignificance: '新鮮な魚介類で有名な市場です。', phrases: [], duration: 75, position: { lat: 35.6654, lng: 139.7707 } },
    { id: 'senso-ji', name: '浅草寺', nameLocal: 'Senso-ji Temple', culturalSignificance: '東京最古の寺院です。', phrases: [], duration: 90, position: { lat: 35.7148, lng: 139.7967 } },
    { id: 'shibuya', name: '渋谷スクランブル交差点', nameLocal: 'Shibuya Crossing', culturalSignificance: '世界一忙しい交差点として有名です。', phrases: [], duration: 45, position: { lat: 35.6598, lng: 139.7006 } },
    { id: 'meiji-shrine', name: '明治神宮', nameLocal: 'Meiji Shrine', culturalSignificance: '明治天皇を祀る神社です。', phrases: [], duration: 75, position: { lat: 35.6763, lng: 139.6993 } }
  ],
  us: [
    { id: 'statue-liberty', name: '自由の女神', nameLocal: 'Statue of Liberty', culturalSignificance: 'アメリカの象徴的な記念碑です。', phrases: [], duration: 120, position: { lat: 40.6892, lng: -74.0445 } },
    { id: 'central-park', name: 'セントラルパーク', nameLocal: 'Central Park', culturalSignificance: 'ニューヨークの都市オアシスです。', phrases: [], duration: 90, position: { lat: 40.7829, lng: -73.9654 } },
    { id: 'times-square', name: 'タイムズスクエア', nameLocal: 'Times Square', culturalSignificance: '世界の交差点として知られています。', phrases: [], duration: 60, position: { lat: 40.7580, lng: -73.9855 } },
    { id: 'brooklyn-bridge', name: 'ブルックリン橋', nameLocal: 'Brooklyn Bridge', culturalSignificance: 'ニューヨークの歴史的な橋です。', phrases: [], duration: 75, position: { lat: 40.7061, lng: -73.9969 } },
    { id: 'empire-state', name: 'エンパイアステートビル', nameLocal: 'Empire State Building', culturalSignificance: 'ニューヨークのランドマークです。', phrases: [], duration: 90, position: { lat: 40.7484, lng: -73.9857 } },
    { id: 'broadway', name: 'ブロードウェイ', nameLocal: 'Broadway', culturalSignificance: '世界的に有名な劇場街です。', phrases: [], duration: 150, position: { lat: 40.7590, lng: -73.9845 } }
  ],
  fr: [
    { id: 'eiffel-tower', name: 'エッフェル塔', nameLocal: 'Tour Eiffel', culturalSignificance: 'パリの象徴的なランドマークです。', phrases: [], duration: 120, position: { lat: 48.8584, lng: 2.2945 } },
    { id: 'louvre', name: 'ルーヴル美術館', nameLocal: 'Musée du Louvre', culturalSignificance: '世界最大の美術館の一つです。', phrases: [], duration: 180, position: { lat: 48.8606, lng: 2.3376 } },
    { id: 'champs-elysees', name: 'シャンゼリゼ通り', nameLocal: 'Champs-Élysées', culturalSignificance: '世界で最も美しい通りとして知られています。', phrases: [], duration: 90, position: { lat: 48.8698, lng: 2.3076 } },
    { id: 'notre-dame', name: 'ノートルダム大聖堂', nameLocal: 'Notre-Dame de Paris', culturalSignificance: 'パリの象徴的なゴシック建築です。', phrases: [], duration: 90, position: { lat: 48.8530, lng: 2.3499 } },
    { id: 'arc-triomphe', name: '凱旋門', nameLocal: 'Arc de Triomphe', culturalSignificance: 'ナポレオンの勝利を記念した門です。', phrases: [], duration: 60, position: { lat: 48.8738, lng: 2.2950 } },
    { id: 'montmartre', name: 'モンマルトル', nameLocal: 'Montmartre', culturalSignificance: '芸術家の街として有名な丘です。', phrases: [], duration: 120, position: { lat: 48.8867, lng: 2.3431 } }
  ],
  gb: [
    { id: 'big-ben', name: 'ビッグベン', nameLocal: 'Big Ben', culturalSignificance: 'ロンドンの象徴的な時計塔です。', phrases: [], duration: 60, position: { lat: 51.4994, lng: -0.1245 } },
    { id: 'british-museum', name: '大英博物館', nameLocal: 'British Museum', culturalSignificance: '世界最古の国立博物館の一つです。', phrases: [], duration: 150, position: { lat: 51.5194, lng: -0.1270 } },
    { id: 'tower-bridge', name: 'タワーブリッジ', nameLocal: 'Tower Bridge', culturalSignificance: 'ロンドンの象徴的な跳ね橋です。', phrases: [], duration: 75, position: { lat: 51.5055, lng: -0.0754 } },
    { id: 'buckingham-palace', name: 'バッキンガム宮殿', nameLocal: 'Buckingham Palace', culturalSignificance: '英国王室の公式宮殿です。', phrases: [], duration: 90, position: { lat: 51.5014, lng: -0.1419 } },
    { id: 'london-eye', name: 'ロンドン・アイ', nameLocal: 'London Eye', culturalSignificance: 'ロンドンの大観覧車です。', phrases: [], duration: 60, position: { lat: 51.5033, lng: -0.1196 } },
    { id: 'westminster-abbey', name: 'ウェストミンスター寺院', nameLocal: 'Westminster Abbey', culturalSignificance: '英国王室の戴冠式が行われる寺院です。', phrases: [], duration: 90, position: { lat: 51.4994, lng: -0.1273 } }
  ],
  de: [
    { id: 'brandenburg-gate', name: 'ブランデンブルク門', nameLocal: 'Brandenburger Tor', culturalSignificance: 'ベルリンの象徴的な門です。', phrases: [], duration: 60, position: { lat: 52.5163, lng: 13.3777 } },
    { id: 'neuschwanstein', name: 'ノイシュヴァンシュタイン城', nameLocal: 'Schloss Neuschwanstein', culturalSignificance: 'おとぎ話の城として有名です。', phrases: [], duration: 150, position: { lat: 47.5576, lng: 10.7498 } },
    { id: 'cologne-cathedral', name: 'ケルン大聖堂', nameLocal: 'Kölner Dom', culturalSignificance: 'ゴシック建築の傑作です。', phrases: [], duration: 90, position: { lat: 50.9413, lng: 6.9583 } },
    { id: 'berlin-wall', name: 'ベルリンの壁', nameLocal: 'Berliner Mauer', culturalSignificance: '東西ドイツ分割の象徴でした。', phrases: [], duration: 75, position: { lat: 52.5063, lng: 13.3923 } },
    { id: 'oktoberfest', name: 'オクトーバーフェスト会場', nameLocal: 'Oktoberfest', culturalSignificance: '世界最大のビール祭りの会場です。', phrases: [], duration: 120, position: { lat: 48.1319, lng: 11.5497 } },
    { id: 'heidelberg-castle', name: 'ハイデルベルク城', nameLocal: 'Heidelberger Schloss', culturalSignificance: 'ロマンチック街道の名城です。', phrases: [], duration: 90, position: { lat: 49.4106, lng: 8.7156 } }
  ],
  it: [
    { id: 'colosseum', name: 'コロッセオ', nameLocal: 'Colosseo', culturalSignificance: '古代ローマの円形闘技場です。', phrases: [], duration: 120, position: { lat: 41.8902, lng: 12.4922 } },
    { id: 'vatican-city', name: 'バチカン市国', nameLocal: 'Città del Vaticano', culturalSignificance: 'カトリックの聖地です。', phrases: [], duration: 180, position: { lat: 41.9029, lng: 12.4534 } },
    { id: 'trevi-fountain', name: 'トレビの泉', nameLocal: 'Fontana di Trevi', culturalSignificance: 'ローマの有名なバロック様式の噴水です。', phrases: [], duration: 45, position: { lat: 41.9009, lng: 12.4833 } },
    { id: 'venice-canals', name: 'ベネチアの運河', nameLocal: 'Canali di Venezia', culturalSignificance: '水の都として有名です。', phrases: [], duration: 150, position: { lat: 45.4408, lng: 12.3155 } },
    { id: 'leaning-tower', name: 'ピサの斜塔', nameLocal: 'Torre di Pisa', culturalSignificance: '世界的に有名な斜塔です。', phrases: [], duration: 75, position: { lat: 43.7230, lng: 10.3966 } },
    { id: 'duomo-milan', name: 'ミラノ大聖堂', nameLocal: 'Duomo di Milano', culturalSignificance: 'ゴシック建築の傑作です。', phrases: [], duration: 90, position: { lat: 45.4642, lng: 9.1900 } }
  ],
  cn: [
    { id: 'great-wall', name: '万里の長城', nameLocal: 'Great Wall of China', culturalSignificance: '中国の象徴的な古代建造物です。', phrases: [], duration: 180, position: { lat: 40.4319, lng: 116.5704 } },
    { id: 'forbidden-city', name: '紫禁城', nameLocal: 'Forbidden City', culturalSignificance: '明・清朝の皇宮です。', phrases: [], duration: 150, position: { lat: 39.9163, lng: 116.3972 } },
    { id: 'temple-heaven', name: '天壇', nameLocal: 'Temple of Heaven', culturalSignificance: '皇帝が天に祈りを捧げた場所です。', phrases: [], duration: 90, position: { lat: 39.8823, lng: 116.4066 } },
    { id: 'terracotta-army', name: '兵馬俑', nameLocal: 'Terracotta Army', culturalSignificance: '秦の始皇帝陵の兵馬俑です。', phrases: [], duration: 120, position: { lat: 34.3848, lng: 109.2734 } },
    { id: 'shanghai-bund', name: '上海外灘', nameLocal: 'The Bund', culturalSignificance: '上海の歴史的な水辺地区です。', phrases: [], duration: 75, position: { lat: 31.2397, lng: 121.4910 } },
    { id: 'summer-palace', name: '頤和園', nameLocal: 'Summer Palace', culturalSignificance: '清朝の離宮庭園です。', phrases: [], duration: 120, position: { lat: 39.9996, lng: 116.2752 } }
  ],
  kr: [
    { id: 'gyeongbokgung', name: '景福宮', nameLocal: 'Gyeongbokgung Palace', culturalSignificance: '朝鮮王朝の正宮です。', phrases: [], duration: 120, position: { lat: 37.5796, lng: 126.9770 } },
    { id: 'namsan-tower', name: 'Nソウルタワー', nameLocal: 'N Seoul Tower', culturalSignificance: 'ソウルのランドマークタワーです。', phrases: [], duration: 90, position: { lat: 37.5512, lng: 126.9882 } },
    { id: 'bukchon-hanok', name: '北村韓屋村', nameLocal: 'Bukchon Hanok Village', culturalSignificance: '伝統的な韓屋が残る地区です。', phrases: [], duration: 75, position: { lat: 37.5828, lng: 126.9833 } },
    { id: 'jeju-island', name: '済州島', nameLocal: 'Jeju Island', culturalSignificance: '韓国の美しい火山島です。', phrases: [], duration: 240, position: { lat: 33.4996, lng: 126.5312 } },
    { id: 'dongdaemun', name: '東大門市場', nameLocal: 'Dongdaemun Market', culturalSignificance: '24時間営業の巨大市場です。', phrases: [], duration: 90, position: { lat: 37.5665, lng: 127.0088 } },
    { id: 'busan-beach', name: '海雲台ビーチ', nameLocal: 'Haeundae Beach', culturalSignificance: '釜山の有名なビーチです。', phrases: [], duration: 120, position: { lat: 35.1587, lng: 129.1603 } }
  ],
  au: [
    { id: 'sydney-opera', name: 'シドニー・オペラハウス', nameLocal: 'Sydney Opera House', culturalSignificance: 'オーストラリアの象徴的な建築物です。', phrases: [], duration: 120, position: { lat: -33.8568, lng: 151.2153 } },
    { id: 'harbour-bridge', name: 'ハーバーブリッジ', nameLocal: 'Sydney Harbour Bridge', culturalSignificance: 'シドニーの美しい橋です。', phrases: [], duration: 90, position: { lat: -33.8523, lng: 151.2108 } },
    { id: 'uluru', name: 'ウルル', nameLocal: 'Uluru', culturalSignificance: 'アボリジニの聖地として知られる巨岩です。', phrases: [], duration: 180, position: { lat: -25.3444, lng: 131.0369 } },
    { id: 'great-barrier-reef', name: 'グレートバリアリーフ', nameLocal: 'Great Barrier Reef', culturalSignificance: '世界最大のサンゴ礁です。', phrases: [], duration: 240, position: { lat: -18.2871, lng: 147.6992 } },
    { id: 'twelve-apostles', name: '12使徒', nameLocal: 'Twelve Apostles', culturalSignificance: '海岸の美しい石灰岩の柱です。', phrases: [], duration: 90, position: { lat: -38.6654, lng: 143.1056 } },
    { id: 'bondi-beach', name: 'ボンダイビーチ', nameLocal: 'Bondi Beach', culturalSignificance: 'シドニーの有名なビーチです。', phrases: [], duration: 120, position: { lat: -33.8915, lng: 151.2767 } }
  ]
}

// シンプルな旅行プラン生成関数（全ての国に対応）
export function generateSimpleTravelPlan(countryId: string): TravelPlan {
  const country = allCountries.find(c => c.id === countryId)
  const destination = country?.name || 'Unknown Destination'
  const continent = country?.continent || 'Asia'

  // 国別特別スポットがあるかチェック
  const specialSpots = countrySpecificSpots[countryId]
  
  let spots: TouristSpot[] = []
  
  if (specialSpots) {
    // 特別スポットがある場合はそれを使用
    spots = specialSpots
  } else {
    // 大陸別テンプレートから生成
    const template = continentSpots[continent as keyof typeof continentSpots] || continentSpots.Asia
    spots = template.spots.slice(0, 6).map((spot, index) => ({
      id: `spot-${index + 1}`,
      name: spot.name,
      nameLocal: spot.nameLocal,
      culturalSignificance: `${destination}の${spot.name}は、この地域の${spot.type === 'historical' ? '歴史' : spot.type === 'cultural' ? '文化' : spot.type === 'nature' ? '自然' : spot.type === 'museum' ? '芸術・歴史' : '生活'}を感じることができる場所です。`,
      phrases: [],
      duration: spot.type === 'museum' ? 120 + Math.floor(Math.random() * 60) : 60 + Math.floor(Math.random() * 60),
      position: { 
        lat: 35.6762 + (Math.random() - 0.5) * 10, 
        lng: 139.6503 + (Math.random() - 0.5) * 20 
      }
    }))
  }

  // 交通手段の選択（大陸別）
  const availableTransport = continentSpots[continent as keyof typeof continentSpots]?.transportation || ['walking', 'taxi', 'bus']
  
  // 交通手段生成ヘルパー関数
  const generateTransportation = (from: string, to: string, index: number) => {
    const method = availableTransport[index % availableTransport.length] as 'walking' | 'taxi' | 'bus' | 'train' | 'car'
    
    const transportDetails = {
      walking: { baseDuration: 15, baseCost: 0, description: '徒歩で移動します。街の雰囲気を楽しみながらゆっくりと歩きましょう。' },
      bus: { baseDuration: 20, baseCost: 300, description: '路線バスで移動します。地元の人々と一緒に移動を楽しめます。' },
      taxi: { baseDuration: 15, baseCost: 800, description: 'タクシーで快適に移動します。運転手さんとの会話も楽しみの一つです。' },
      train: { baseDuration: 25, baseCost: 500, description: '電車で移動します。効率的で環境に優しい移動手段です。' },
      car: { baseDuration: 20, baseCost: 600, description: 'レンタカーで移動します。自由度の高い移動が可能です。' }
    }
    
    const detail = transportDetails[method]
    return {
      id: `transport-${index}`,
      from,
      to,
      method,
      duration: detail.baseDuration + Math.floor(Math.random() * 15),
      cost: method === 'walking' ? 0 : detail.baseCost + Math.floor(Math.random() * 300),
      details: detail.description
    }
  }

  // 3日間のプランを生成
  const days: DayPlan[] = [
    {
      date: '1日目',
      spots: spots.slice(0, 3), // 最初の3つのスポット
      transportations: [
        generateTransportation(spots[0]?.name || '', spots[1]?.name || '', 0),
        generateTransportation(spots[1]?.name || '', spots[2]?.name || '', 1)
      ],
      isOpen: true
    },
    {
      date: '2日目',
      spots: spots.slice(3, 5), // 次の2つのスポット
      transportations: spots.length > 4 ? [
        generateTransportation(spots[3]?.name || '', spots[4]?.name || '', 2)
      ] : [],
      isOpen: false
    },
    {
      date: '3日目',
      spots: spots.slice(5, 6), // 最後のスポット
      transportations: [],
      isOpen: false
    }
  ].filter(day => day.spots.length > 0) // スポットがない日は除外

  return {
    destination,
    days
  }
}