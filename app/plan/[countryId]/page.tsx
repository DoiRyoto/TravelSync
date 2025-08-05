'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, use } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

// Components
import { Header } from '@/components/layout/header';
import { DayPlan } from './_components/day-plan';
import { SpotSearchDialog } from './_components/spot-search-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Icons
import { Info, XCircle, ArrowLeft, RotateCcw, Route, Map } from 'lucide-react';

// Types and utilities
import { TravelPlan, TouristSpot } from './_components/types';
import { generateSimpleTravelPlan } from './_components/generate-simple-plan';

interface PlanPageProps {
  params: Promise<{
    countryId: string;
  }>;
}

export default function PlanPage({ params }: PlanPageProps) {
  const { countryId } = use(params);
  const router = useRouter();
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isRouteSearching, setIsRouteSearching] = useState(false);
  const [transportationOpenStates, setTransportationOpenStates] = useState<{ [key: string]: boolean }>({});
  const [hasChanges, setHasChanges] = useState(false);

  // 観光地変更ダイアログの状態
  const [isSpotDialogOpen, setIsSpotDialogOpen] = useState(false);
  const [selectedSpotInfo, setSelectedSpotInfo] = useState<{
    dayIndex: number;
    spotIndex: number;
    spot: TouristSpot;
  } | null>(null);

  // プラン生成のためのuseEffect
  useEffect(() => {
    const generatePlan = async () => {
      try {
        setLoading(true);
        // シンプルなプラン生成（非同期処理をシミュレート）
        await new Promise((resolve) => setTimeout(resolve, 500));
        const plan = generateSimpleTravelPlan(countryId);
        setTravelPlan(plan);
      } catch (err) {
        console.error('Error generating travel plan:', err);
        setError('旅行プランの生成中にエラーが発生しました。');
      } finally {
        setLoading(false);
      }
    };

    generatePlan();
  }, [countryId]);

  // ドラッグアンドドロップ処理
  const handleDragEnd = (event: DragEndEvent, dayIndex: number) => {
    const { active, over } = event;

    if (active.id !== over?.id && travelPlan) {
      const updatedPlan = { ...travelPlan };
      const day = updatedPlan.days[dayIndex];
      const oldIndex = day.spots.findIndex((spot) => spot.id === active.id);
      const newIndex = day.spots.findIndex((spot) => spot.id === over?.id);

      day.spots = arrayMove(day.spots, oldIndex, newIndex);
      setTravelPlan(updatedPlan);
      setHasChanges(true); // 変更があったことを記録
    }
  };

  // 日程の開閉切り替え
  const toggleDayOpen = (dayIndex: number) => {
    if (!travelPlan) return;

    const updatedPlan = { ...travelPlan };
    updatedPlan.days[dayIndex].isOpen = !updatedPlan.days[dayIndex].isOpen;
    setTravelPlan(updatedPlan);
  };

  // ルート再検索
  const handleRouteResearch = async () => {
    if (!travelPlan || !hasChanges) return;

    setIsRouteSearching(true);
    // モック：2秒待機してルートを再生成
    setTimeout(() => {
      const updatedPlan = { ...travelPlan };
      updatedPlan.days.forEach((day) => {
        day.transportations = day.transportations.map((transport) => ({
          ...transport,
          duration: Math.floor(Math.random() * 30) + 10,
          cost: transport.method === 'walking' ? 0 : Math.floor(Math.random() * 1000) + 200,
        }));
      });
      setTravelPlan(updatedPlan);

      setHasChanges(false); // 変更状態をリセット
      setIsRouteSearching(false);
    }, 2000);
  };

  // 移動手段の開閉状態を切り替え
  const toggleTransportation = (transportId: string) => {
    setTransportationOpenStates((prev) => ({
      ...prev,
      [transportId]: !prev[transportId],
    }));
  };

  const handleTouristSpotClick = (dayIndex: number, spotIndex: number) => {
    if (!travelPlan) return;

    const spot = travelPlan.days[dayIndex].spots[spotIndex];
    setSelectedSpotInfo({ dayIndex, spotIndex, spot });
    setIsSpotDialogOpen(true);
  };

  // 観光地選択処理
  const handleSpotSelect = (newSpot: TouristSpot) => {
    if (!travelPlan || !selectedSpotInfo) return;

    const updatedPlan = { ...travelPlan };
    updatedPlan.days[selectedSpotInfo.dayIndex].spots[selectedSpotInfo.spotIndex] = {
      ...newSpot,
      id: selectedSpotInfo.spot.id, // 既存のIDを保持してドラッグアンドドロップが正常に動作するようにする
    };

    setTravelPlan(updatedPlan);
    setHasChanges(true);
    setSelectedSpotInfo(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <main className="flex-1 container py-8 px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[50vh]">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-muted-foreground justify-center">
                  <Info className="h-6 w-6 animate-spin text-primary" />
                  <div>
                    <div className="font-medium">プランを読み込み中...</div>
                    <div className="text-sm">旅行プランを生成しています</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <main className="flex-1 container py-8 px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
            <Alert variant="destructive" className="max-w-md">
              <XCircle className="h-4 w-4" />
              <AlertTitle>エラー</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button variant="outline" onClick={() => router.push('/')} className="w-fit">
              <ArrowLeft className="mr-2 h-4 w-4" /> ホームに戻る
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="flex-1 container py-8 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => {
                if (hasChanges) {
                  const confirmed = window.confirm('プランに未保存の変更があります。ホームに戻りますか？');
                  if (confirmed) {
                    router.push('/');
                  }
                } else {
                  router.push('/');
                }
              }}
              className="min-h-[44px] px-4 w-full sm:w-auto"
              aria-label="ホームページに戻る"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="hidden xs:inline">目的地を変更</span>
              <span className="xs:hidden">ホーム</span>
            </Button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {hasChanges && (
                <div
                  className="text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-md flex items-center gap-2"
                  role="status"
                  aria-live="polite"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" aria-hidden="true"></span>
                  未保存の変更
                </div>
              )}

              <Button
                variant="default"
                onClick={handleRouteResearch}
                disabled={isRouteSearching || !hasChanges}
                className="min-h-[44px] px-4 w-full sm:w-auto"
                aria-label={
                  isRouteSearching
                    ? 'ルートを検索中'
                    : hasChanges
                    ? 'プランの変更を反映してルートを再検索'
                    : '変更がありません'
                }
              >
                {isRouteSearching ? (
                  <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Route className="mr-2 h-4 w-4" />
                )}
                <span className="hidden sm:inline">
                  {isRouteSearching ? 'ルート検索中...' : hasChanges ? 'ルート再検索' : 'ルート再検索（変更なし）'}
                </span>
                <span className="sm:hidden">{isRouteSearching ? '検索中...' : hasChanges ? '再検索' : '検索'}</span>
              </Button>
            </div>
          </div>

          <section>
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 flex items-start md:items-center gap-2 flex-col md:flex-row">
                <div className="flex items-center gap-2">
                  <Map className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
                  <span className="text-xl md:text-3xl">あなたの旅行プラン</span>
                </div>
                <span className="text-lg md:text-2xl text-primary font-semibold md:ml-2">
                  {travelPlan?.destination}
                </span>
              </h2>
              <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <p className="text-blue-800 dark:text-blue-200 text-sm md:text-base leading-relaxed">
                  <strong className="block md:inline mb-1 md:mb-0">📝使い方ガイド:</strong>
                  観光地をタップして変更、ドラッグで順序変更、移動手段の詳細を確認できます。
                  変更後は「ルート再検索」で最適化しましょう。
                </p>
              </div>
            </div>

            {travelPlan?.days.map((day, dayIndex) => (
              <DayPlan
                key={dayIndex}
                day={day}
                dayIndex={dayIndex}
                transportationOpenStates={transportationOpenStates}
                onToggleDay={toggleDayOpen}
                onDragEnd={handleDragEnd}
                onToggleTransportation={toggleTransportation}
                onSpotClick={handleTouristSpotClick}
              />
            ))}
          </section>
        </div>

        {/* 観光地変更ダイアログ */}
        {selectedSpotInfo && (
          <SpotSearchDialog
            open={isSpotDialogOpen}
            onOpenChange={setIsSpotDialogOpen}
            countryId={countryId}
            currentSpot={selectedSpotInfo.spot}
            onSpotSelect={handleSpotSelect}
          />
        )}
      </main>
    </div>
  );
}
