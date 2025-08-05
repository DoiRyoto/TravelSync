'use client';

import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Globe, 
  Calendar, 
  Users, 
  Target, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Smartphone, 
  Zap,
  Code,
  Database,
  Palette,
  CheckCircle2,
  MapPin,
  Route,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection = ({ children, className = "", delay = 0 }: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FormStepDemo = ({ icon: Icon, title, description, isActive }: {
  icon: any;
  title: string;
  description: string;
  isActive: boolean;
}) => (
  <motion.div
    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
      isActive 
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
        : 'border-gray-200 bg-gray-50 dark:bg-gray-800'
    }`}
    animate={{
      scale: isActive ? 1.05 : 1,
      boxShadow: isActive ? '0 10px 25px rgba(59, 130, 246, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}
  >
    <div className="flex items-center gap-3">
      <Icon className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
      <div>
        <h4 className={`font-semibold ${isActive ? 'text-blue-900 dark:text-blue-100' : 'text-gray-600'}`}>
          {title}
        </h4>
        <p className={`text-sm ${isActive ? 'text-blue-700 dark:text-blue-200' : 'text-gray-500'}`}>
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

const TechStack = [
  { name: 'Next.js 15', icon: Code, description: 'App Router + TypeScript' },
  { name: 'shadcn/ui', icon: Palette, description: 'モダンUIコンポーネント' },
  { name: 'Tailwind CSS', icon: Palette, description: 'ユーティリティファースト' },
  { name: 'Elysia', icon: Database, description: 'TypeScript API' },
  { name: 'React Hook Form', icon: CheckCircle2, description: 'フォーム管理' },
  { name: '@dnd-kit', icon: Target, description: 'ドラッグ&ドロップ' }
];

const FormSteps = [
  { icon: Globe, title: "目的地", description: "どこに行く？" },
  { icon: Calendar, title: "基本情報", description: "いつ・どのくらい？" },
  { icon: Users, title: "旅行者情報", description: "誰と行く？" },
  { icon: Target, title: "旅行スタイル", description: "何をしたい？" },
  { icon: Sparkles, title: "確認", description: "プラン生成" }
];

export default function PresentationPage() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % FormSteps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5" />
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              あなたに合わせて、
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                旅が変わる。
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              TravelSyncで理想の旅行プランを。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Sparkles className="mr-2 w-5 h-5" />
                デモを見る
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                機能を詳しく
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: Clock, label: "5つの質問", value: "わずか5分" },
              { icon: Smartphone, label: "自動生成", value: "完璧なプラン" },
              { icon: Target, label: "カスタマイズ", value: "ドラッグ&ドロップ" },
              { icon: Zap, label: "最適化", value: "ルート自動調整" }
            ].map((item, index) => (
              <Card key={index} className="text-center p-4 bg-white/80 backdrop-blur">
                <CardContent className="pt-4">
                  <item.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                  <p className="font-semibold text-gray-900">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <AnimatedSection className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            旅行計画に
            <span className="text-red-500">何時間も</span>
            かけていませんか？
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: Clock,
                title: "時間がかかる",
                description: "観光地の選定、ルート検討、移動手段の調査..."
              },
              {
                icon: Target,
                title: "最適化が困難",
                description: "効率的なルート設計は専門知識が必要"
              },
              {
                icon: Smartphone,
                title: "柔軟性がない",
                description: "プラン変更時の再計算が面倒"
              }
            ].map((problem, index) => (
              <Card key={index} className="p-6 bg-red-50 border-red-200 dark:bg-red-900/20">
                <CardHeader>
                  <problem.icon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <CardTitle className="text-red-700 dark:text-red-300">{problem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-600 dark:text-red-400">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Solution Section */}
      <AnimatedSection className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              たった
              <span className="text-blue-500">5つの質問</span>
              に答えるだけ
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              TravelSyncなら、あなた専用の完璧な旅行プランが完成します。
              でもそれだけじゃありません。
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 mb-12">
            {FormSteps.map((step, index) => (
              <FormStepDemo
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                isActive={currentStep === index}
              />
            ))}
          </div>

          <div className="text-center">
            <Badge variant="secondary" className="text-lg px-6 py-2 mb-4">
              進行中: ステップ {currentStep + 1}/5
            </Badge>
            <p className="text-gray-600 dark:text-gray-300">
              自動的にステップが進行するデモです
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Features Demo Section */}
      <AnimatedSection className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-green-500">自動の便利さ</span>
              と
              <span className="text-purple-500">あなたらしい柔軟性</span>
              を両立
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Target className="text-blue-500" />
                ドラッグ&ドロップで自由に調整
              </h3>
              <ul className="space-y-4">
                {[
                  "観光地をドラッグして順序を変更",
                  "リアルタイムでルートが更新",
                  "移動時間・コストを自動計算",
                  "直感的な操作で簡単カスタマイズ"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8">
              <div className="space-y-4">
                {[
                  { icon: MapPin, name: "東京スカイツリー", time: "10:00-12:00" },
                  { icon: Route, name: "移動 (電車 15分)", time: "12:00-12:15" },
                  { icon: MapPin, name: "浅草寺", time: "12:15-14:00" },
                  { icon: Route, name: "移動 (徒歩 8分)", time: "14:00-14:08" },
                  { icon: MapPin, name: "仲見世通り", time: "14:08-15:30" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/80 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                  >
                    <item.icon className={`w-5 h-5 ${
                      item.icon === Route ? 'text-gray-400' : 'text-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                    <div className="w-2 h-8 bg-gray-200 rounded cursor-grab active:cursor-grabbing" />
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </AnimatedSection>

      {/* Tech Stack Section */}
      <AnimatedSection className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
            モダンな技術スタック
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {TechStack.map((tech, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <tech.icon className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                  <CardTitle className="text-lg">{tech.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Conclusion Section */}
      <AnimatedSection className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            新しい旅行プランナーの誕生
          </h2>
          
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl mb-12">
            <h3 className="text-2xl font-bold mb-4">TravelSync</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              「自動の便利さ」と「あなたらしい柔軟性」を両立した、
              新しい旅行プランナーです。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              <Star className="mr-2 w-5 h-5" />
              今すぐ体験
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              詳細資料を見る
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}