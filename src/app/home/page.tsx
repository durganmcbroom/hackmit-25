'use client'
import React, { useState, useMemo, useEffect, useRef, FC } from 'react';

// --- TYPE DEFINITIONS ---
type View = 'home' | 'track' | 'history' | 'trends' | 'getHelp';

interface Symptom {
  id: string;
  date: string; // YYYY-MM-DD format
  description: string;
  severity: number; // 1-10 scale
}

interface Location {
    lat: number;
    lng: number;
}

// --- SVG ICONS ---
const CalendarIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
  </svg>
);

const ChartIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
  </svg>
);

const BackIcon: FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
);


// --- MOCK DATA ---
const getInitialSymptoms = (): Symptom[] => {
    const today = new Date();
    const mockSymptoms: Symptom[] = [];
    for(let i = 2; i < 15; i+=2) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        mockSymptoms.push({
            id: `mock-${i}`,
            date: date.toISOString().split('T')[0],
            description: i % 4 === 0 ? 'Headache' : 'Fatigue',
            severity: Math.floor(Math.random() * 6) + 3,
        });
    }
    mockSymptoms.push({
        id: 'mock-today',
        date: today.toISOString().split('T')[0],
        description: 'Slight Cough',
        severity: 4
    });
    return mockSymptoms;
};


// --- UI HELPER COMPONENTS ---

const Header: FC<{ title: string; onBack: () => void }> = ({ title, onBack }) => (
    <div className="relative flex items-center justify-center mb-6">
        <button onClick={onBack} className="absolute left-0 p-2 rounded-full hover:bg-gray-700 transition-colors">
            <BackIcon className="w-6 h-6 text-indigo-400" />
        </button>
        <h1 className="text-2xl font-bold text-indigo-400">{title}</h1>
    </div>
);


// --- PAGE COMPONENTS ---

const HomePage: FC<{ setView: (view: View) => void }> = ({ setView }) => {
    return (
        <div className="flex flex-col h-full p-4 space-y-4">
            <button
                onClick={() => setView('track')}
                className="flex-grow w-full bg-gray-800 text-white rounded-xl shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-3xl font-bold"
                style={{ minHeight: '150px' }}
            >
                TRACK
            </button>
            <div className="grid grid-cols-2 gap-4 h-1/2">
                <button
                    onClick={() => setView('history')}
                    className="w-full h-full bg-gray-800 text-white rounded-xl shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-2xl font-bold"
                >
                    HISTORY
                </button>
                <button
                    onClick={() => setView('trends')}
                    className="w-full h-full bg-gray-800 text-white rounded-xl shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-2xl font-bold"
                >
                    TRENDS
                </button>
            </div>
            <button
                onClick={() => setView('getHelp')}
                className="flex-grow w-full bg-gray-800 text-white rounded-xl shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-3xl font-bold"
                style={{ minHeight: '150px' }}
            >
                GET HELP
            </button>
        </div>
    );
};

const TrackPage: FC<{ onBack: () => void; addSymptom: (symptom: Omit<Symptom, 'id'>) => void; }> = ({ onBack, addSymptom }) => {
    const [description, setDescription] = useState('');
    const [severity, setSeverity] = useState(5);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = () => {
        if (!description.trim()) {
            alert("Please enter a symptom description.");
            return;
        }
        addSymptom({ date, description: description.trim(), severity });
        onBack();
    };

    return (
        <div className="p-6">
            <Header title="Track Symptom" onBack={onBack} />
            <div className="space-y-6">
                 <div>
                    <label htmlFor="symptom-date" className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                    <input
                        id="symptom-date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-gray-700 border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                </div>
                <div>
                    <label htmlFor="symptom-description" className="block text-sm font-medium text-gray-300 mb-2">Symptom</label>
                    <input
                        id="symptom-description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g., Headache, Nausea"
                        className="w-full bg-gray-700 border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                </div>
                <div>
                    <label htmlFor="symptom-severity" className="block text-sm font-medium text-gray-300 mb-2">Severity: {severity}</label>
                     <input
                        id="symptom-severity"
                        type="range"
                        min="1"
                        max="10"
                        value={severity}
                        onChange={(e) => setSeverity(Number(e.target.value))}
                        className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-indigo-500"
                    />
                    <div className="flex justify-between text-xs text-gray-400 px-1">
                        <span>Mild</span>
                        <span>Moderate</span>
                        <span>Severe</span>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Save Symptom
                </button>
            </div>
        </div>
    );
};


const HistoryPage: FC<{ onBack: () => void; symptoms: Symptom[]; }> = ({ onBack, symptoms }) => {
    const [historyView, setHistoryView] = useState<'calendar' | 'graph'>('calendar');
    const [calendarDate, setCalendarDate] = useState(new Date());

    // Calendar logic
    const currentYear = calendarDate.getFullYear();
    const currentMonth = calendarDate.getMonth();
    const calendarGrid = useMemo(() => {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const grid = [];
        for (let i = 0; i < firstDayOfMonth; i++) grid.push(null);
        for (let day = 1; day <= daysInMonth; day++) grid.push(day);
        return grid;
    }, [currentMonth, currentYear]);
    
    // Graph Data
    const graphData = useMemo(() => 
        symptoms
            .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(-30) // show last 30 symptoms
    , [symptoms]);

    const navigateMonths = (dir: 'prev' | 'next') => {
        setCalendarDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + (dir === 'next' ? 1 : -1));
            return newDate;
        });
    };

    return (
        <div className="p-6">
            <Header title="History" onBack={onBack} />
            <div className="flex justify-center mb-4 bg-gray-800 p-1 rounded-lg">
                <button
                    onClick={() => setHistoryView('calendar')}
                    className={`px-4 py-2 text-sm font-medium rounded-md w-1/2 transition ${historyView === 'calendar' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}
                >
                    <CalendarIcon className="w-5 h-5 inline-block mr-2" />
                    Calendar
                </button>
                <button
                    onClick={() => setHistoryView('graph')}
                    className={`px-4 py-2 text-sm font-medium rounded-md w-1/2 transition ${historyView === 'graph' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}
                >
                    <ChartIcon className="w-5 h-5 inline-block mr-2" />
                    Graph
                </button>
            </div>
            
            {historyView === 'calendar' && (
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <button onClick={() => navigateMonths('prev')} className="p-2 rounded-full hover:bg-gray-700">&lt;</button>
                        <h3 className="font-bold">{calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                        <button onClick={() => navigateMonths('next')} className="p-2 rounded-full hover:bg-gray-700">&gt;</button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={`${d}-${i}`}>{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {calendarGrid.map((day, i) => {
                            if (!day) return <div key={`empty-${i}`}></div>;
                            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                            const symptomsOnDay = symptoms.filter(s => s.date === dateStr);
                            const hasSymptoms = symptomsOnDay.length > 0;
                            return (
                                <div key={day} className={`h-12 flex items-center justify-center rounded-lg text-sm ${hasSymptoms ? 'bg-red-500/50' : 'bg-gray-700'}`}>
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            
            {historyView === 'graph' && (
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-bold mb-4 text-center">Symptom Severity (Last 30 entries)</h3>
                    {graphData.length > 0 ? (
                    <div className="w-full h-64 flex items-end justify-around space-x-1">
                       {graphData.map(symptom => {
                           const barHeight = `${(symptom.severity / 10) * 100}%`;
                           return (
                               <div key={symptom.id} className="flex-1 flex flex-col items-center justify-end group">
                                   <div className="text-xs mb-1 opacity-0 group-hover:opacity-100 transition-opacity">{symptom.severity}</div>
                                   <div
                                     className="w-full bg-indigo-500 rounded-t-sm hover:bg-indigo-400"
                                     style={{ height: barHeight }}
                                     title={`${symptom.date}: ${symptom.description} (Severity: ${symptom.severity})`}
                                   ></div>
                                   <div className="text-[10px] mt-1 text-gray-400 transform rotate-45">
                                       {new Date(symptom.date + 'T00:00:00').toLocaleDateString('en-us', {month: '2-digit', day: '2-digit'})}
                                   </div>
                               </div>
                           )
                       })}
                    </div>
                    ) : (
                        <p className="text-center text-gray-400 h-64 flex items-center justify-center">Not enough data to display a graph.</p>
                    )}
                </div>
            )}
        </div>
    );
};


const TrendsPage: FC<{ onBack: () => void; symptoms: Symptom[]; }> = ({ onBack, symptoms }) => {
    const trends = useMemo(() => {
        if (symptoms.length === 0) return null;
        const frequency: Record<string, number> = {};
        symptoms.forEach(s => {
            const desc = s.description.toLowerCase();
            frequency[desc] = (frequency[desc] || 0) + 1;
        });
        const mostFrequent = Object.entries(frequency).sort((a, b) => b[1] - a[1])[0];
        return {
            mostFrequentSymptom: mostFrequent[0],
            count: mostFrequent[1],
        };
    }, [symptoms]);

    return (
        <div className="p-6">
            <Header title="Trends" onBack={onBack} />
            {trends ? (
                <div className="bg-gray-800 p-6 rounded-lg text-center">
                    <h3 className="text-gray-400 text-lg">Most Frequent Symptom</h3>
                    <p className="text-3xl font-bold capitalize text-indigo-400 my-2">{trends.mostFrequentSymptom}</p>
                    <p className="text-gray-300">Logged <span className="font-bold text-white">{trends.count}</span> times.</p>
                </div>
            ) : (
                <p className="text-center text-gray-400 mt-8">Not enough data to calculate trends.</p>
            )}
        </div>
    );
};

const GetHelpPage: FC<{ onBack: () => void }> = ({ onBack }) => {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);
    const mapRef = useRef<any>(null); // To hold map instance
    const mapContainerRef = useRef<HTMLDivElement | null>(null); // To hold map container DOM element

    useEffect(() => {
        // Dynamically load Leaflet CSS
        const leafletCss = document.createElement('link');
        leafletCss.rel = 'stylesheet';
        leafletCss.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
        document.head.appendChild(leafletCss);

        // Dynamically load Leaflet JS
        const leafletJs = document.createElement('script');
        leafletJs.src = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
        document.head.appendChild(leafletJs);
        
        leafletJs.onload = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                        setError(null);
                    },
                    () => {
                        setError("Unable to retrieve your location. Please enable location services.");
                    }
                );
            } else {
                setError("Geolocation is not supported by your browser.");
            }
        };

        return () => { // Cleanup
            document.head.removeChild(leafletCss);
            document.head.removeChild(leafletJs);
        };
    }, []);

    useEffect(() => {
        if (location && mapContainerRef.current && (window as any).L && !mapRef.current) {
            const L = (window as any).L;
            mapRef.current = L.map(mapContainerRef.current).setView([location.lat, location.lng], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapRef.current);
            L.marker([location.lat, location.lng]).addTo(mapRef.current)
                .bindPopup('Your Location')
                .openPopup();
        }
    }, [location]);

    return (
        <div className="p-6 h-full flex flex-col">
            <Header title="Get Help" onBack={onBack} />
            <div className="bg-gray-800 p-4 rounded-lg flex-grow flex flex-col items-center justify-center">
                {error && <p className="text-red-400 text-center">{error}</p>}
                {!location && !error && <p className="text-center">Getting your location...</p>}
                <div ref={mapContainerRef} className="w-full h-64 rounded-md my-4 z-0"></div>
                {location && (
                    <a
                        href={`https://www.google.com/maps/search/pharmacies+near+me/@${location.lat},${location.lng},14z`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 text-center"
                    >
                        Find Nearby Pharmacies
                    </a>
                )}
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---

const Home: FC = () => {
  const [view, setView] = useState<View>('home');
  const [symptoms, setSymptoms] = useState<Symptom[]>(getInitialSymptoms);

  const addSymptom = (symptom: Omit<Symptom, 'id'>) => {
      setSymptoms(prev => [...prev, { ...symptom, id: crypto.randomUUID() }]);
  };

  const renderView = () => {
    switch (view) {
      case 'track':
        return <TrackPage onBack={() => setView('home')} addSymptom={addSymptom} />;
      case 'history':
        return <HistoryPage onBack={() => setView('home')} symptoms={symptoms} />;
      case 'trends':
        return <TrendsPage onBack={() => setView('home')} symptoms={symptoms} />;
      case 'getHelp':
        return <GetHelpPage onBack={() => setView('home')} />;
      case 'home':
      default:
        return <HomePage setView={setView} />;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <div className="max-w-md mx-auto h-screen bg-gray-900 shadow-2xl">
        {renderView()}
      </div>
    </div>
  );
};

export default Home;

