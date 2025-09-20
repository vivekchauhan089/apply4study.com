import { useState } from 'react';
import { MessageCircle } from 'lucide-react'; // icon

const ChatBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#FD7311',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 999,
        }}
        aria-label="Chat"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '320px',
            height: '400px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              backgroundColor: '#FD7311',
              color: '#fff',
              padding: '10px',
              fontWeight: 'bold',
            }}
          >
            Chat with us
          </div>
          <div style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
            <p>Hello! How can we help you?</p>
            {/* Chat messages go here */}
          </div>
          <div style={{ padding: '10px', borderTop: '1px solid #ccc' }}>
            <input
              type="text"
              placeholder="Type your message..."
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBtn;
