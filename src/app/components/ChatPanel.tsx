import { useState, useEffect, useRef } from 'react';
import { User } from '../App';
import { ChatMessage } from '../utils/dataInitializer';
import { Send } from 'lucide-react';

interface ChatPanelProps {
  currentUser: User;
}

export function ChatPanel({ currentUser }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 3000); // Refresh every 3 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadData = () => {
    const messagesData = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    
    setMessages(messagesData);
    setUsers(usersData.filter((u: User) => ['admin', 'manager', 'vendor'].includes(u.role)));
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    const messagesData = [...messages, message];
    localStorage.setItem('chatMessages', JSON.stringify(messagesData));
    setMessages(messagesData);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'manager':
        return 'bg-indigo-100 text-indigo-700';
      case 'vendor':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'manager':
        return 'Gérant';
      case 'vendor':
        return 'Vendeur';
      default:
        return role;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md h-[calc(100vh-250px)] flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Chat d'équipe</h2>
        <p className="text-sm text-gray-600">
          {users.length} membres connectés
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Aucun message. Commencez la conversation!
          </div>
        ) : (
          messages.map((msg) => {
            const isOwn = msg.senderId === currentUser.id;
            return (
              <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">{msg.senderName}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor(msg.senderRole)}`}>
                      {getRoleLabel(msg.senderRole)}
                    </span>
                  </div>
                  <div className={`rounded-lg px-4 py-2 ${
                    isOwn 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.message}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            onClick={sendMessage}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            <span>Envoyer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
