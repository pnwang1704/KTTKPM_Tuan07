import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventLogPanel() {
  const [logs, setLogs] = useState([]);
  const { status } = useSelector((state) => state.booking);

  useEffect(() => {
    if (status !== 'IDLE') {
      const newLog = {
        id: Date.now(),
        message: `Booking event: ${status}`,
        time: new Date().toLocaleTimeString()
      };
      setLogs((prev) => [newLog, ...prev].slice(0, 5));
    }
  }, [status]);

  if (logs.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 glass-panel rounded-lg overflow-hidden z-50">
      <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2">
        <Activity className="w-4 h-4 text-accent-blue" />
        <span className="text-xs font-semibold tracking-wider text-gray-300">SYSTEM EVENTS</span>
      </div>
      <div className="p-3 space-y-2">
        <AnimatePresence>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-xs flex justify-between items-center bg-black/40 px-2 py-1.5 rounded border border-white/5"
            >
              <span className="text-gray-400 font-mono">{log.time}</span>
              <span className={`font-medium ${log.message.includes('FAILED') ? 'text-accent-red' : log.message.includes('COMPLETED') ? 'text-green-400' : 'text-accent-blue'}`}>
                {log.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
