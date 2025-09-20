import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Users, MessageCircle, Video, Calendar, FileText, 
  Plus, Search, Filter, Share, Star, Clock 
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const CollaborationHub = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState('teams');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'teams', label: 'My Teams', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'meetings', label: 'Meetings', icon: Video },
    { id: 'documents', label: 'Documents', icon: FileText },
  ];

  const teams = [
    {
      id: 1,
      name: 'AI Study Assistant',
      project: 'AI Study Assistant',
      members: [
        { id: 1, name: 'Sarah Chen', avatar: 'S', role: 'Lead Developer', online: true },
        { id: 2, name: 'Dr. Johnson', avatar: 'J', role: 'Mentor', online: true },
        { id: 3, name: 'Alex Kumar', avatar: 'A', role: 'UI/UX Designer', online: false },
      ],
      lastActivity: '2 hours ago',
      status: 'active',
      progress: 75,
    },
    {
      id: 2,
      name: 'Green Transport Team',
      project: 'Green Transport App',
      members: [
        { id: 4, name: 'Maya Patel', avatar: 'M', role: 'Product Manager', online: true },
        { id: 5, name: 'Prof. Smith', avatar: 'P', role: 'Advisor', online: false },
      ],
      lastActivity: '1 day ago',
      status: 'planning',
      progress: 25,
    },
  ];

  const messages = [
    {
      id: 1,
      from: 'Dr. Johnson',
      avatar: 'J',
      message: 'Great progress on the ML model! How are you handling the data preprocessing?',
      time: '10 minutes ago',
      project: 'AI Study Assistant',
      unread: true,
    },
    {
      id: 2,
      from: 'Alex Kumar',
      avatar: 'A',
      message: 'I\'ve updated the wireframes based on user feedback. Take a look when you can!',
      time: '1 hour ago',
      project: 'AI Study Assistant',
      unread: true,
    },
    {
      id: 3,
      from: 'Maya Patel',
      avatar: 'M',
      message: 'Team meeting scheduled for tomorrow at 3 PM. Agenda attached.',
      time: '3 hours ago',
      project: 'Green Transport App',
      unread: false,
    },
  ];

  const meetings = [
    {
      id: 1,
      title: 'Weekly Sprint Review',
      project: 'AI Study Assistant',
      date: 'Today, 3:00 PM',
      duration: '1 hour',
      attendees: ['Sarah Chen', 'Dr. Johnson', 'Alex Kumar'],
      type: 'recurring',
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Project Kickoff',
      project: 'Green Transport App',
      date: 'Tomorrow, 10:00 AM',
      duration: '2 hours',
      attendees: ['Maya Patel', 'Prof. Smith'],
      type: 'one-time',
      status: 'upcoming',
    },
    {
      id: 3,
      title: 'Demo Preparation',
      project: 'AI Study Assistant',
      date: 'Yesterday, 2:00 PM',
      duration: '45 minutes',
      attendees: ['Sarah Chen', 'Alex Kumar'],
      type: 'one-time',
      status: 'completed',
    },
  ];

  const documents = [
    {
      id: 1,
      name: 'Project Requirements',
      project: 'AI Study Assistant',
      type: 'document',
      lastModified: '2 hours ago',
      author: 'Sarah Chen',
      shared: true,
    },
    {
      id: 2,
      name: 'UI Wireframes v2',
      project: 'AI Study Assistant',
      type: 'design',
      lastModified: '1 day ago',
      author: 'Alex Kumar',
      shared: true,
    },
    {
      id: 3,
      name: 'Market Research Analysis',
      project: 'Green Transport App',
      type: 'spreadsheet',
      lastModified: '3 days ago',
      author: 'Maya Patel',
      shared: false,
    },
  ];

  const renderTeams = () => (
    <div className="space-y-6">
      {teams.map((team, index) => (
        <motion.div
          key={team.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{team.name}</h3>
                <p className="text-gray-400">{team.project}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  team.status === 'active' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {team.status}
                </span>
                <Button size="sm" variant="outline">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-3">Team Members</h4>
                <div className="space-y-2">
                  {team.members.map(member => (
                    <div key={member.id} className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {member.avatar}
                        </div>
                        {member.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{member.name}</p>
                        <p className="text-gray-400 text-sm">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-300">Progress</h4>
                  <span className="text-blue-400 font-medium">{team.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${team.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                  <span>Last activity: {team.lastActivity}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="primary" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Video className="w-4 h-4 mr-2" />
                    Meet
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`p-4 ${message.unread ? 'border-blue-500/30 bg-blue-500/5' : ''}`}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                {message.avatar}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-white">{message.from}</h4>
                    <p className="text-gray-400 text-sm">{message.project}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {message.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                    <span className="text-gray-400 text-sm">{message.time}</span>
                  </div>
                </div>
                <p className="text-gray-300">{message.message}</p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">Reply</Button>
                  <Button size="sm" variant="ghost">Mark as read</Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderMeetings = () => (
    <div className="space-y-4">
      {meetings.map((meeting, index) => (
        <motion.div
          key={meeting.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-white mb-1">{meeting.title}</h4>
                <p className="text-gray-400 text-sm">{meeting.project}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                meeting.status === 'upcoming' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'bg-green-500/20 text-green-400'
              }`}>
                {meeting.status}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex items-center gap-2 text-gray-300 mb-2">
                  <Clock className="w-4 h-4" />
                  <span>{meeting.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="w-4 h-4" />
                  <span>{meeting.attendees.length} attendees</span>
                </div>
              </div>
              <div className="flex gap-2">
                {meeting.status === 'upcoming' && (
                  <>
                    <Button size="sm" variant="primary">Join</Button>
                    <Button size="sm" variant="outline">Reschedule</Button>
                  </>
                )}
                {meeting.status === 'completed' && (
                  <Button size="sm" variant="outline">View Recording</Button>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderDocuments = () => (
    <div className="grid md:grid-cols-2 gap-4">
      {documents.map((doc, index) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-4 hover:scale-105 transition-transform cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{doc.name}</h4>
                <p className="text-gray-400 text-sm mb-2">{doc.project}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>By {doc.author}</span>
                  <span>{doc.lastModified}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {doc.shared && (
                    <span className="flex items-center gap-1 text-xs text-green-400">
                      <Share className="w-3 h-3" />
                      Shared
                    </span>
                  )}
                  <Star className="w-4 h-4 text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer" />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Collaboration Hub</h1>
          <p className="text-gray-400 mt-1">Work together, achieve more</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Team
        </Button>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teams, messages, documents..."
            className="pl-10 pr-4 py-2 w-full bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 border-b border-gray-700"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {activeTab === 'teams' && renderTeams()}
        {activeTab === 'messages' && renderMessages()}
        {activeTab === 'meetings' && renderMeetings()}
        {activeTab === 'documents' && renderDocuments()}
      </motion.div>
    </div>
  );
};

export default CollaborationHub;