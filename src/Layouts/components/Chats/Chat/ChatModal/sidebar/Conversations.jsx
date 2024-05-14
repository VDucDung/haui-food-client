import { CircularProgress, Divider, Typography } from '@mui/material';

import Conversation from './Conversation';
import { getRandomEmoji } from '../../utils/emojis';
import { useChatContext } from '../../context/ChatContext';
import useGetConversations from '../../hooks/useGetConversations';

const Conversations = () => {
  const { newConversation } = useChatContext();
  const { conversations, loading } = useGetConversations();
  const user = JSON.parse(localStorage.getItem('user'));

  if (newConversation) {
    const isExist = newConversation._id === user._id || conversations.some(conversation => conversation._id === newConversation._id);
    if (!isExist) {
      conversations.unshift(newConversation);
    }
  }

  if (loading) {
    return (
      <div style={{ color: 'var(--primary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={24} style={{ color: 'var(--primary-bg)' }} />
        <Typography variant='body2' style={{ marginLeft: '0.5rem' }}>Loading...</Typography>
      </div>
    );
  }

  return (
    <div style={{
      maxHeight: '400px',
      overflowY: 'auto',
      overflowX: 'hidden',
      height: '400px',
      padding: '0 0.5rem',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {conversations.map((conversation, idx) => (
        <div key={conversation._id}>
          <Conversation conversation={conversation} emoji={getRandomEmoji()} lastIdx={idx === conversations.length - 1} />
          {idx !== conversations.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
};

export default Conversations;
