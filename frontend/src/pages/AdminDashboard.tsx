import { useState, useEffect, useRef } from 'react';
import api from '../api';
import { 
  LayoutDashboard, FileText, GraduationCap, Image, 
  CheckSquare, Users, Globe, Plus, Trash2, Edit, Save, X, Search, Bell, AlertTriangle, Sliders,
  Lock, Upload, ChevronRight, HelpCircle, History, LogOut
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  difficulty: string;
  modules: string[];
}

interface LibraryResource {
  id: string;
  title: string;
  author: string;
  type: string;
  year: string;
  description: string;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface Registration {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'online' | 'onsite';
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'urgent' | 'read' | 'unread';
  createdAt: string;
}

interface UserProfile {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'user';
}

interface SeoSetting {
  path: string;
  title: string;
  description: string;
  keywords: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onNavigateHome }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [contentSubTab, setContentSubTab] = useState<'blogs' | 'resources'>('blogs');
  
  // Data States
  const [courses, setCourses] = useState<Course[]>([]);
  const [resources, setResources] = useState<LibraryResource[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [seoSettings, setSeoSettings] = useState<SeoSetting[]>([]);
  const [siteSettings, setSiteSettings] = useState({
    siteTitle: 'ფსიქოსინთეზის ქართული ინსტიტუტი',
    navHome: 'მთავარი',
    navAboutDropdown: 'ჩვენ შესახებ',
    navHistory: 'ინსტიტუტის ისტორია',
    navFounder: 'დამფუძნებელი',
    navTrainers: 'ტრენერები',
    navAcademic: 'აკადემიური პორტალი',
    navEvents: 'საჯარო აქტივობები',
    navPractice: 'მედიტაციის ოთახი',
    navWorkspace: 'სამუშაო სივრცე',
    academicCoursesTab: 'აკადემიური კურსები',
    academicLibraryTab: 'ბიბლიოთეკა',
    academicBlogsTab: 'ბლოგები და პუბლიკაციები',
    academicTitle: 'აკადემიური პორტალი',
    academicSubtitle: 'გაიღრმავეთ ცოდნა ფსიქოსინთეზის თეორიაში, გაეცანით კლასიკურ ნაშრომებსა და უახლეს სამეცნიერო პუბლიკაციებს.',
    eventsTitle: 'საჯარო აქტივობები & ღონისძიებები',
    eventsSubtitle: 'გაეცანით ჩვენს უახლოეს სემინარებს, ვორქშოფებსა და ინტენსიურ კურსებს.',
    practiceTitle: 'მედიტაციისა და თვითშემეცნების ოთახი',
    practiceSubtitle: 'შინაგანი მშვიდობის, დეიდენტიფიკაციისა და ცნობიერების ამაღლების პრაქტიკები.',
    founderTitle: 'რობერტო ასაჯიოლი & დამფუძნებლები',
    founderSubtitle: 'ფსიქოსინთეზის ფუძემდებლის ცხოვრება, ფილოსოფია და ინსტიტუტის აკადემიური გუნდი.',
    historyText: 'ფსიქოსინთეზის ქართული ინსტიტუტი დაარსდა მეცნიერული და თერაპიული კვლევების ბაზაზე. ინსტიტუტის მიზანია რობერტო ასაჯიოლის ინტეგრალური ფსიქოლოგიის პრინციპების დანერგვა და პიროვნული ტრანსფორმაციის ხელშეწყობა.',
    founderBioText: 'დოქტორი ელენე კვანტალიანი არის ინსტიტუტის დამფუძნებელი და წამყვანი ფსიქოთერაპევტი, რომელსაც აქვს 20-წლიანი გამოცდილება ინტეგრალურ ფსიქოლოგიასა და ფსიქოსინთეზის პრაქტიკაში.',
    trainersText: 'ჩვენი აკადემიური გუნდი შედგება სერტიფიცირებული ფსიქოლოგების, თერაპევტებისა და ტრენერებისგან, რომლებიც ატარებენ ინტენსიურ კურსებსა და ინდივიდუალურ კონსულტაციებს.',
    heroTitle: 'ინტეგრალური ფსიქოლოგია & პიროვნული ტრანსფორმაცია',
    heroSubtitle: 'საქართველოს ფსიქოსინთეზის ინსტიტუტი - მეცნიერება შინაგანი მთლიანობისა და სულიერი ზრდის შესახებ.',
    heroCtaButton: 'პროგრამების დათვალიერება',
    aboutTitle: 'ინსტიტუტის შესახებ',
    aboutText: 'ქართული ფსიქოსინთეზის ინსტიტუტი არის წამყვანი აკადემიური და თერაპიული ცენტრი საქართველოში, რომელიც ეფუძნება რობერტო ასაჯიოლის ნაშრომებს.',
    footerCopyright: '© 2026 ფსიქოსინთეზის ქართული ინსტიტუტი. ყველა უფლება დაცულია.',
    footerContactEmail: 'info@psychosynthesis.ge',
    footerContactPhone: '+995 32 2 100 200'
  });

  // Editing / Form States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState({ title: '', description: '', duration: '', category: '', difficulty: '', modules: '' });
  const [blogForm, setBlogForm] = useState({ 
    title: '', 
    content: '', 
    author: 'Dr. K. Abashidze',
    category: 'Personal Growth',
    slug: 'path-to-personal-growth',
    metaDescription: 'ამ სტატიაში განვიხილავთ პიროვნული ზრდის ძირითად ეტაპებს ფსიქოსინთეზის ჭრილში.',
    videoUrl: '',
    allowComments: true,
    showInSlider: true,
    tags: ['Self-Actualization', 'Assagioli']
  });
  const [resourceForm, setResourceForm] = useState({ title: '', author: '', type: 'წიგნი', year: '', description: '' });
  const [eventForm, setEventForm] = useState({ title: '', date: '', time: '', location: '', category: 'online' as 'online' | 'onsite' });
  const [seoForm, setSeoForm] = useState({ path: '/', title: '', description: '', keywords: '' });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Rich Text Editor states
  const editorRef = useRef<HTMLDivElement>(null);
  const [newTag, setNewTag] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setBlogForm(prev => ({ ...prev, content: editorRef.current?.innerHTML || '' }));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !blogForm.tags.includes(newTag.trim())) {
      setBlogForm(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setBlogForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }));
  };

  // Fetch all databases on load or tab change
  useEffect(() => {
    fetchAllData();
  }, [activeTab]);

  const fetchAllData = async () => {
    try {
      const [
        coursesRes, resourcesRes, blogsRes, eventsRes, registrationsRes, inquiriesRes, usersRes, seoRes, settingsRes
      ] = await Promise.all([
        api.get('/admin/courses'),
        api.get('/admin/resources'),
        api.get('/admin/blogs'),
        api.get('/admin/events'),
        api.get('/admin/registrations'),
        api.get('/admin/inquiries'),
        api.get('/admin/users'),
        api.get('/admin/seo'),
        api.get('/admin/settings')
      ]);

      setCourses(coursesRes.data);
      setResources(resourcesRes.data);
      setBlogs(blogsRes.data);
      setEvents(eventsRes.data);
      setRegistrations(registrationsRes.data);
      setInquiries(inquiriesRes.data);
      setUsers(usersRes.data);
      setSeoSettings(seoRes.data);
      if (settingsRes.data) {
        setSiteSettings(prev => ({ ...prev, ...settingsRes.data }));
      }
    } catch (error) {
      console.error('Error fetching admin details:', error);
    }
  };

  const handleShowAddForm = () => {
    setShowAddForm(!showAddForm);
    setEditingId(null);
    clearForms();
  };

  const clearForms = () => {
    setCourseForm({ title: '', description: '', duration: '8 კვირა', category: 'აკადემიური', difficulty: 'დამწყები', modules: '' });
    setBlogForm({ 
      title: '', 
      content: '', 
      author: 'Dr. K. Abashidze',
      category: 'Personal Growth',
      slug: 'path-to-personal-growth',
      metaDescription: 'ამ სტატიაში განვიხილავთ პიროვნული ზრდის ძირითად ეტაპებს ფსიქოსინთეზის ჭრილში.',
      videoUrl: '',
      allowComments: true,
      showInSlider: true,
      tags: ['Self-Actualization', 'Assagioli']
    });
    setResourceForm({ title: '', author: '', type: 'წიგნი', year: new Date().getFullYear().toString(), description: '' });
    setEventForm({ title: '', date: '', time: '', location: '', category: 'online' });
    setSeoForm({ path: '/', title: '', description: '', keywords: '' });
    setErrorMessage('');
    setSuccessMessage('');
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
  };

  // --- CRUD ACTIONS ---

  // Courses
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    const modulesArray = courseForm.modules.split(',').map(m => m.trim()).filter(Boolean);
    const data = { ...courseForm, modules: modulesArray };
    
    try {
      if (editingId) {
        await api.put(`/admin/courses/${editingId}`, data);
        setSuccessMessage('კურსი წარმატებით განახლდა!');
      } else {
        await api.post('/admin/courses', data);
        setSuccessMessage('კურსი წარმატებით დაემატა!');
      }
      setShowAddForm(false);
      setEditingId(null);
      clearForms();
      fetchAllData();
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'შეცდომა კურსის შენახვისას');
    }
  };

  const handleEditCourse = (course: Course) => {
    setCourseForm({
      title: course.title,
      description: course.description,
      duration: course.duration,
      category: course.category,
      difficulty: course.difficulty,
      modules: course.modules.join(', ')
    });
    setEditingId(course.id);
    setShowAddForm(true);
  };

  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm('ნამდვილად გსურთ კურსის წაშლა?')) return;
    try {
      await api.delete(`/admin/courses/${id}`);
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // Blogs
  const handleSaveBlog = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalContent = editorRef.current ? editorRef.current.innerHTML : blogForm.content;
    const postData = {
      title: blogForm.title,
      content: finalContent,
      author: blogForm.author
    };
    try {
      if (editingId) {
        await api.put(`/admin/blogs/${editingId}`, postData);
        triggerToast('სტატია წარმატებით განახლდა!');
      } else {
        await api.post('/admin/blogs', postData);
        triggerToast('სტატია წარმატებით დაემატა!');
      }
      setTimeout(() => {
        setShowAddForm(false);
        setEditingId(null);
        clearForms();
        fetchAllData();
      }, 1000);
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'შეცდომა სტატიის შენახვისას');
      triggerToast(err.response?.data?.message || 'შეცდომა სტატიის შენახვისას');
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setBlogForm({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      category: 'Personal Growth',
      slug: blog.title.toLowerCase().replace(/[^a-z0-9\u10d0-\u10fa]+/g, '-').replace(/(^-|-$)/g, ''),
      metaDescription: blog.content.substring(0, 150).replace(/<[^>]*>/g, ''),
      videoUrl: '',
      allowComments: true,
      showInSlider: true,
      tags: ['Self-Actualization', 'Assagioli']
    });
    setEditingId(blog.id);
    setShowAddForm(true);
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = blog.content;
      }
    }, 50);
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm('ნამდვილად გსურთ სტატიის წაშლა?')) return;
    try {
      await api.delete(`/admin/blogs/${id}`);
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // Resources
  const handleSaveResource = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/resources/${editingId}`, resourceForm);
        setSuccessMessage('მასალა წარმატებით განახლდა!');
      } else {
        await api.post('/admin/resources', resourceForm);
        setSuccessMessage('მასალა წარმატებით დაემატა!');
      }
      setShowAddForm(false);
      setEditingId(null);
      clearForms();
      fetchAllData();
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'შეცდომა მასალის შენახვისას');
    }
  };

  const handleEditResource = (res: LibraryResource) => {
    setResourceForm({
      title: res.title,
      author: res.author,
      type: res.type,
      year: res.year,
      description: res.description
    });
    setEditingId(res.id);
    setShowAddForm(true);
  };

  const handleDeleteResource = async (id: string) => {
    if (!window.confirm('ნამდვილად გსურთ მასალის წაშლა?')) return;
    try {
      await api.delete(`/admin/resources/${id}`);
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // Events
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/events/${editingId}`, eventForm);
        setSuccessMessage('ღონისძიება წარმატებით განახლდა!');
      } else {
        await api.post('/admin/events', eventForm);
        setSuccessMessage('ღონისძიება წარმატებით დაემატა!');
      }
      setShowAddForm(false);
      setEditingId(null);
      clearForms();
      fetchAllData();
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'შეცდომა ღონისძიების შენახვისას');
    }
  };

  const handleEditEvent = (ev: Event) => {
    setEventForm({
      title: ev.title,
      date: ev.date,
      time: ev.time,
      location: ev.location,
      category: ev.category
    });
    setEditingId(ev.id);
    setShowAddForm(true);
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('ნამდვილად გსურთ ღონისძიების წაშლა?')) return;
    try {
      await api.delete(`/admin/events/${id}`);
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // Course Registrations (Approve/Reject)
  const handleUpdateRegistration = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await api.put(`/admin/registrations/${id}`, { status });
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRegistration = async (id: string) => {
    if (!window.confirm('ნამდვილად გსურთ მოთხოვნის წაშლა?')) return;
    try {
      await api.delete(`/admin/registrations/${id}`);
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // Inquiries (Mark Read, Delete)
  const handleUpdateInquiry = async (id: string, status: 'read' | 'urgent') => {
    try {
      await api.put(`/admin/inquiries/${id}`, { status });
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('ნამდვილად გსურთ შეტყობინების წაშლა?')) return;
    try {
      await api.delete(`/admin/inquiries/${id}`);
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // Users (Toggle Admin, Delete)
  const handleToggleAdmin = async (user: UserProfile) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    try {
      await api.put(`/admin/users/${user.id}`, { role: newRole });
      fetchAllData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'შეცდომა როლის შეცვლისას');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('ნამდვილად გსურთ მომხმარებლის წაშლა?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // SEO Settings
  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/admin/seo', seoForm);
      setSuccessMessage('SEO პარამეტრები წარმატებით განახლდა!');
      setSeoForm({ path: '/', title: '', description: '', keywords: '' });
      fetchAllData();
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'შეცდომა SEO შენახვისას');
    }
  };

  const handleEditSeo = (seo: SeoSetting) => {
    setSeoForm({
      path: seo.path,
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords
    });
  };

  // Filter lists based on search
  const filteredCourses = courses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredBlogs = blogs.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredResources = resources.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.username.toLowerCase().includes(searchQuery.toLowerCase()));

  // Calculate quick metrics for Bento Grid
  const totalBlogs = blogs.length;
  const totalRegistrations = registrations.length;
  const urgentInquiries = inquiries.filter(i => i.status === 'urgent').length;
  const unreadInquiries = inquiries.filter(i => i.status === 'unread').length;

  // Site Settings & Text Manager
  const handleSaveSiteSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/admin/settings', siteSettings);
      triggerToast('საიტის ტექსტები და ნავბარის პარამეტრები წარმატებით განახლდა!');
    } catch (err: any) {
      triggerToast(err.response?.data?.message || 'შეცდომა საიტის ტექსტების შენახვისას');
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-on-background relative -mt-32 -mb-20 -mx-6 md:-mx-12 overflow-x-hidden">
      
      {/* Sidebar Aside Left */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-primary dark:bg-primary-container shadow-xl flex flex-col py-6 z-50 text-white">
        <div className="px-6 mb-10 text-left">
          <button onClick={onNavigateHome} className="font-headline-md text-headline-md font-semibold text-on-primary text-left focus:outline-none">Psychosynthesis Institute</button>
          <p className="font-label-md text-label-md text-on-primary-fixed-variant opacity-70">Administrative CMS</p>
        </div>
        
        <nav className="flex-1 space-y-1 text-left">
          <button
            onClick={() => { setActiveTab('dashboard'); setShowAddForm(false); }}
            className={`w-full text-left pl-5 py-3 flex items-center gap-3 transition-colors duration-200 ${
              activeTab === 'dashboard'
                ? 'text-tertiary-fixed font-bold border-l-4 border-tertiary-fixed bg-primary-container/50 translate-x-1'
                : 'text-on-primary-fixed-variant opacity-80 hover:bg-primary-container hover:text-on-primary'
            }`}
          >
            <LayoutDashboard size={18} />
            <span className="font-label-md">Dashboard</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('courses'); setShowAddForm(false); }}
            className={`w-full text-left pl-5 py-3 flex items-center gap-3 transition-colors duration-200 ${
              activeTab === 'courses'
                ? 'text-tertiary-fixed font-bold border-l-4 border-tertiary-fixed bg-primary-container/50 translate-x-1'
                : 'text-on-primary-fixed-variant opacity-80 hover:bg-primary-container hover:text-on-primary'
            }`}
          >
            <GraduationCap size={18} />
            <span className="font-label-md">Study Programs</span>
          </button>

          <button
            onClick={() => { setActiveTab('media'); setShowAddForm(false); }}
            className={`w-full text-left pl-5 py-3 flex items-center gap-3 transition-colors duration-200 ${
              activeTab === 'media'
                ? 'text-tertiary-fixed font-bold border-l-4 border-tertiary-fixed bg-primary-container/50 translate-x-1'
                : 'text-on-primary-fixed-variant opacity-80 hover:bg-primary-container hover:text-on-primary'
            }`}
          >
            <Image size={18} />
            <span className="font-label-md">Media Library</span>
          </button>

          <button
            onClick={() => { setActiveTab('content'); setContentSubTab('blogs'); setShowAddForm(false); }}
            className={`w-full text-left pl-5 py-3 flex items-center gap-3 transition-colors duration-200 ${
              activeTab === 'content'
                ? 'text-tertiary-fixed font-bold border-l-4 border-tertiary-fixed bg-primary-container/50 translate-x-1'
                : 'text-on-primary-fixed-variant opacity-80 hover:bg-primary-container hover:text-on-primary'
            }`}
          >
            <FileText size={18} />
            <span className="font-label-md">Blog Management</span>
          </button>

          <button
            onClick={() => { setActiveTab('registrations'); setShowAddForm(false); }}
            className={`w-full text-left pl-5 py-3 flex items-center gap-3 transition-colors duration-200 ${
              activeTab === 'registrations'
                ? 'text-tertiary-fixed font-bold border-l-4 border-tertiary-fixed bg-primary-container/50 translate-x-1'
                : 'text-on-primary-fixed-variant opacity-80 hover:bg-primary-container hover:text-on-primary'
            }`}
          >
            <CheckSquare size={18} />
            <span className="font-label-md">Registrations</span>
            {registrations.filter(r => r.status === 'pending').length > 0 && (
              <span className="ml-auto mr-4 bg-error text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {registrations.filter(r => r.status === 'pending').length}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('users'); setShowAddForm(false); }}
            className={`w-full text-left pl-5 py-3 flex items-center gap-3 transition-colors duration-200 ${
              activeTab === 'users'
                ? 'text-tertiary-fixed font-bold border-l-4 border-tertiary-fixed bg-primary-container/50 translate-x-1'
                : 'text-on-primary-fixed-variant opacity-80 hover:bg-primary-container hover:text-on-primary'
            }`}
          >
            <Users size={18} />
            <span className="font-label-md">Users</span>
          </button>

          <button
            onClick={() => { setActiveTab('seo'); setShowAddForm(false); }}
            className={`w-full text-left pl-5 py-3 flex items-center gap-3 transition-colors duration-200 ${
              activeTab === 'seo'
                ? 'text-tertiary-fixed font-bold border-l-4 border-tertiary-fixed bg-primary-container/50 translate-x-1'
                : 'text-on-primary-fixed-variant opacity-80 hover:bg-primary-container hover:text-on-primary'
            }`}
          >
            <Globe size={18} />
            <span className="font-label-md">SEO & Meta Tags</span>
          </button>

          <button
            onClick={() => { setActiveTab('site'); setShowAddForm(false); }}
            className={`w-full text-left pl-5 py-3 flex items-center gap-3 transition-colors duration-200 ${
              activeTab === 'site'
                ? 'text-tertiary-fixed font-bold border-l-4 border-tertiary-fixed bg-primary-container/50 translate-x-1'
                : 'text-on-primary-fixed-variant opacity-80 hover:bg-primary-container hover:text-on-primary'
            }`}
          >
            <Sliders size={18} />
            <span className="font-label-md">Site Content & Navbar</span>
          </button>
        </nav>

        <div className="px-6 mt-auto space-y-3">
          <button
            onClick={() => { setActiveTab('content'); setContentSubTab('blogs'); handleShowAddForm(); }}
            className="w-full py-3 bg-tertiary-container text-on-tertiary-container font-label-md rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity font-bold text-xs"
          >
            <Plus size={14} />
            New Entry
          </button>

          <button
            onClick={onLogout}
            className="w-full text-primary-fixed-dim hover:text-white py-2 rounded-lg font-label-md flex items-center justify-center transition-colors text-xs font-semibold focus:outline-none"
          >
            <LogOut size={14} className="mr-2" />
            გასვლა
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-grow ml-64 min-h-screen flex flex-col justify-between">
        
        {/* Top App Bar Header */}
        <header className="sticky top-0 z-40 w-full h-16 bg-surface/85 backdrop-blur-md flex items-center justify-between px-8 border-b border-outline-variant/30 text-text-main">
          <div className="flex items-center gap-4 flex-1">
            <Search className="text-on-surface-variant" size={18} />
            <input 
              className="bg-transparent border-none focus:ring-0 w-64 text-sm text-on-surface focus:outline-none" 
              placeholder="Search entries, media, or students..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="text-on-surface-variant hover:text-primary transition-colors flex">
              <Bell size={20} />
              {(unreadInquiries > 0 || urgentInquiries > 0) && (
                <span className="block h-2 w-2 rounded-full bg-error ring-1 ring-surface animate-pulse" />
              )}
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <HelpCircle size={20} />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/60">
              <div className="text-right">
                <p className="font-label-md text-xs text-primary font-bold leading-tight">Dr. K. Abashidze</p>
                <p className="text-[9px] uppercase tracking-wider text-on-surface-variant font-semibold">Senior Editor</p>
              </div>
              <img 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/10" 
                alt="Dr. K. Abashidze" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7Gq0V58T3dOFKq-1kETRyEpUZli9whiuAC6Hp9CYq7zj16NH35fD0S6uRxnOxn78TPss8cqYqw1GQayE9USJKuuVA5MYY1bZhV12ZDIVISU-3zoU3DomvCk-pfePCOa__FTt8EqpQYZBk7q31emHq8Pf67XzhAR9AzNgGoaXcYad_P6RXrdwwcRVPsnOeAJ65E4a0agc82ABVYuTazJZZaQ7TFHSmlvh5w2kNUuLpnSn1P97T2FMj"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Area */}
        <div className="p-8 max-w-[1400px] mx-auto w-full flex-grow space-y-10">
          {showAddForm && activeTab === 'content' && contentSubTab === 'blogs' ? (
            /* Left Column: Editor */
            <div className="grid grid-cols-12 gap-8 items-start animate-fadeIn text-text-main text-left">
              <div className="col-span-12 lg:col-span-8 space-y-8">
                {/* Header Actions */}
                <div className="flex items-center justify-between">
                  <nav className="flex items-center gap-2 text-on-surface-variant text-sm">
                    <button type="button" onClick={() => { setShowAddForm(false); setEditingId(null); }} className="hover:text-primary transition-colors">Blog Management</button>
                    <ChevronRight size={14} className="text-outline" />
                    <span className="text-primary font-medium">{editingId ? 'Edit Post' : 'New Post'}</span>
                  </nav>
                  <div className="flex items-center gap-3">
                    <button 
                      type="button"
                      onClick={() => triggerToast('ცვლილებები შეინახა როგორც დრაფტი')}
                      className="px-6 py-2.5 border border-primary text-primary font-label-md rounded-xl hover:bg-primary/5 transition-colors font-bold text-xs"
                    >
                      დრაფტად შენახვა
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleSaveBlog()}
                      className="px-6 py-2.5 bg-tertiary-container text-on-tertiary-container font-label-md rounded-xl hover:bg-tertiary-fixed transition-all font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">send</span>
                      გამოქვეყნება (Publish)
                    </button>
                  </div>
                </div>

                {/* Main Form Card */}
                <div className="bg-surface-card rounded-xl shadow-[0_4px_20px_rgba(15,59,46,0.05)] p-8 space-y-6 border border-outline-variant/30">
                  {/* Title Field */}
                  <div className="space-y-2">
                    <label className="font-label-md text-[10px] font-bold text-text-muted">ARTICLE TITLE (GEORGIAN)</label>
                    <input 
                      className="w-full border-b border-outline-variant focus:border-primary focus:ring-0 text-headline-lg font-headline-lg bg-transparent py-2 transition-colors focus:outline-none" 
                      placeholder="Enter title here..." 
                      type="text" 
                      value={blogForm.title}
                      onChange={e => setBlogForm({ ...blogForm, title: e.target.value })}
                      required
                    />
                  </div>

                  {/* Meta & Category Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="font-label-md text-[10px] font-bold text-text-muted">CATEGORY</label>
                      <div className="relative">
                        <select 
                          className="w-full bg-surface-muted border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-text-main appearance-none"
                          value={blogForm.category}
                          onChange={e => setBlogForm({ ...blogForm, category: e.target.value })}
                        >
                          <option value="Psychosynthesis Fundamentals">Psychosynthesis Fundamentals</option>
                          <option value="Personal Growth">Personal Growth</option>
                          <option value="Therapeutic Practice">Therapeutic Practice</option>
                          <option value="Institutional News">Institutional News</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-on-surface-variant">expand_more</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="font-label-md text-[10px] font-bold text-text-muted">PERMALINK SLUG</label>
                      <div className="flex items-center bg-surface-muted rounded-lg px-4 py-3 border border-white/5">
                        <span className="text-on-surface-variant text-sm">/blog/</span>
                        <input 
                          className="bg-transparent border-none focus:ring-0 text-sm w-full ml-1 focus:outline-none text-text-main" 
                          type="text" 
                          value={blogForm.slug}
                          onChange={e => setBlogForm({ ...blogForm, slug: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Meta Description */}
                  <div className="space-y-2">
                    <label className="font-label-md text-[10px] font-bold text-text-muted">META DESCRIPTION</label>
                    <textarea 
                      className="w-full bg-surface-muted border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-text-main" 
                      placeholder="Brief summary for SEO search results..." 
                      rows={2}
                      value={blogForm.metaDescription}
                      onChange={e => setBlogForm({ ...blogForm, metaDescription: e.target.value })}
                    />
                  </div>

                  {/* Rich Text Editor */}
                  <div className="space-y-2 pt-4">
                    <label className="font-label-md text-[10px] font-bold text-text-muted">CONTENT EDITOR</label>
                    <div className="border border-outline-variant rounded-xl overflow-hidden bg-white text-text-main shadow-inner">
                      {/* Toolbar */}
                      <div className="bg-surface-container-low border-b border-outline-variant p-2 flex flex-wrap gap-1">
                        <button type="button" onClick={() => handleFormat('bold')} className="editor-toolbar-btn p-2 rounded hover:bg-black/5" title="Bold"><span className="material-symbols-outlined">format_bold</span></button>
                        <button type="button" onClick={() => handleFormat('italic')} className="editor-toolbar-btn p-2 rounded hover:bg-black/5" title="Italic"><span className="material-symbols-outlined">format_italic</span></button>
                        <button type="button" onClick={() => handleFormat('underline')} className="editor-toolbar-btn p-2 rounded hover:bg-black/5" title="Underline"><span className="material-symbols-outlined">format_underlined</span></button>
                        <div className="w-px h-6 bg-outline-variant mx-1 self-center"></div>
                        <button type="button" onClick={() => handleFormat('justifyLeft')} className="editor-toolbar-btn p-2 rounded hover:bg-black/5" title="Align Left"><span className="material-symbols-outlined">format_align_left</span></button>
                        <button type="button" onClick={() => handleFormat('justifyCenter')} className="editor-toolbar-btn p-2 rounded hover:bg-black/5" title="Align Center"><span className="material-symbols-outlined">format_align_center</span></button>
                        <button type="button" onClick={() => handleFormat('insertUnorderedList')} className="editor-toolbar-btn p-2 rounded hover:bg-black/5" title="Bulleted List"><span className="material-symbols-outlined">format_list_bulleted</span></button>
                        <div className="w-px h-6 bg-outline-variant mx-1 self-center"></div>
                        <button type="button" onClick={() => {
                          const url = prompt('Enter URL:');
                          if (url) handleFormat('createLink', url);
                        }} className="editor-toolbar-btn p-2 rounded hover:bg-black/5" title="Insert Link"><span className="material-symbols-outlined">link</span></button>
                        <button type="button" onClick={() => {
                          const url = prompt('Enter Image URL:');
                          if (url) handleFormat('insertImage', url);
                        }} className="editor-toolbar-btn p-2 rounded hover:bg-black/5" title="Insert Image"><span className="material-symbols-outlined">image</span></button>
                        <div className="flex-1"></div>
                        <button type="button" onClick={() => triggerToast('სარედაქციო ისტორია ცარიელია')} className="editor-toolbar-btn p-2 rounded text-primary flex items-center gap-1 hover:bg-black/5">
                          <History size={14} />
                          <span className="text-xs font-bold">REVISIONS</span>
                        </button>
                      </div>
                      {/* Content Area */}
                      <div 
                        ref={editorRef}
                        className="p-8 min-h-[400px] focus:outline-none prose max-w-none font-body-lg text-on-surface-variant leading-relaxed text-sm bg-white" 
                        contentEditable="true"
                        onBlur={() => {
                          if (editorRef.current) {
                            setBlogForm(prev => ({ ...prev, content: editorRef.current?.innerHTML || '' }));
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Video Embed Section */}
                <div className="bg-surface-card rounded-xl shadow-[0_4px_20px_rgba(15,59,46,0.05)] p-8 border border-outline-variant/30">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-tertiary-container text-3xl">play_circle</span>
                    <h3 className="font-headline-md text-primary text-xl">Video Embed</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm text-on-surface-variant">Include a relevant video from YouTube, Facebook, or Vimeo to accompany this article.</p>
                    <div className="flex gap-4">
                      <div className="flex-1 relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">link</span>
                        <input 
                          className="w-full bg-surface-muted border-none rounded-lg pl-12 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-text-main" 
                          placeholder="https://www.youtube.com/watch?v=..." 
                          type="text"
                          value={blogForm.videoUrl}
                          onChange={e => setBlogForm({ ...blogForm, videoUrl: e.target.value })}
                        />
                      </div>
                      <button 
                        type="button"
                        onClick={() => triggerToast('ვიდეო წარმატებით ჩაიტვირთა')}
                        className="px-8 py-3 bg-secondary text-on-secondary font-label-md rounded-lg hover:opacity-90 transition-all font-bold text-xs"
                      >
                        Fetch Video
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Sidebar Settings */}
              <div className="col-span-12 lg:col-span-4 space-y-8">
                {/* Publishing Panel */}
                <div className="bg-surface-card rounded-xl shadow-[0_4px_20px_rgba(15,59,46,0.05)] overflow-hidden border border-outline-variant/30">
                  <div className="bg-primary text-on-primary p-4 flex items-center justify-between">
                    <span className="font-label-md text-xs font-bold uppercase tracking-wider">გამოქვეყნების პარამეტრები</span>
                    <Lock size={16} className="opacity-80" />
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-on-surface-variant">სტატუსი:</span>
                      <span className="px-3 py-1 bg-tertiary-container/20 text-tertiary font-bold text-xs rounded-full">მზად არის</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-on-surface-variant">ხილვადობა:</span>
                      <div className="flex items-center gap-2 text-primary font-bold">
                        <span className="material-symbols-outlined text-base">public</span>
                        <span>საჯარო</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-on-surface-variant">განრიგი:</span>
                      <button type="button" className="text-primary underline font-bold text-xs">დაუყოვნებლივ</button>
                    </div>
                    <hr className="border-outline-variant/30"/>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          className="rounded text-primary focus:ring-primary w-5 h-5 border-outline-variant/30" 
                          type="checkbox"
                          checked={blogForm.allowComments}
                          onChange={e => setBlogForm({ ...blogForm, allowComments: e.target.checked })}
                        />
                        <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">კომენტარების დაშვება</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          className="rounded text-primary focus:ring-primary w-5 h-5 border-outline-variant/30" 
                          type="checkbox"
                          checked={blogForm.showInSlider}
                          onChange={e => setBlogForm({ ...blogForm, showInSlider: e.target.checked })}
                        />
                        <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">მთავარი გვერდის სლაიდერში ჩვენება</span>
                      </label>
                    </div>
                    
                    <button 
                      type="button"
                      onClick={() => handleSaveBlog()}
                      className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-xs shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                    >
                      <span className="material-symbols-outlined text-base">publish</span>
                      გამოქვეყნება (Publish Post)
                    </button>
                  </div>
                </div>

                {/* Featured Image Panel */}
                <div className="bg-surface-card rounded-xl shadow-[0_4px_20px_rgba(15,59,46,0.05)] overflow-hidden border border-outline-variant/30">
                  <div className="bg-surface-container-high p-4 flex items-center justify-between border-b border-outline-variant/30">
                    <span className="font-label-md text-xs font-bold text-primary uppercase tracking-wider">Featured Image</span>
                    <button className="text-primary hover:bg-primary/5 p-1.5 rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="relative group cursor-pointer aspect-video rounded-xl overflow-hidden bg-surface-muted flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/55 hover:border-primary transition-all">
                      <img 
                        className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500" 
                        alt="Scholarly library layout" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAixIDbUFFnGTbNScISOREsy2iD7MRUUAzKPDvkiYTi-WMqJcxa5IicLIluQNB-Q-KoEIBUxGN7SWc5wfl5MbMfHD-HxivsaX3vg42a10NI8eXj4UDXuxm55U85GlLzrHUN_LmXm-FvdxfdoX4pdAGRdgYfNQ_KK-VjFC2QR603ZSdWh5Zt0yzh92fubJ9r4DZP3w-GgGK271d_56P1hnV5bTY6zBSb3zXO-TG7PvIIpnrmMhfenWM"
                      />
                      <div className="relative z-10 bg-white/95 backdrop-blur px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload size={14} className="text-primary" />
                        <span className="font-label-md text-xs text-primary font-bold">Change Photo</span>
                      </div>
                    </div>
                    <p className="mt-4 text-[10px] text-on-surface-variant text-center leading-relaxed">Recommended: 1200 x 630px. High resolution scholarly aesthetic required.</p>
                  </div>
                </div>

                {/* Tags Panel */}
                <div className="bg-surface-card rounded-xl shadow-[0_4px_20px_rgba(15,59,46,0.05)] p-6 border border-outline-variant/30 space-y-4">
                  <label className="font-label-md text-xs font-bold text-text-muted uppercase tracking-wider block">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {blogForm.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-surface-muted text-on-surface-variant text-xs rounded-full flex items-center gap-1.5 border border-white/5 font-semibold">
                        {tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-error transition-colors">
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="relative">
                    <input 
                      className="w-full bg-surface-muted border-none rounded-lg px-4 py-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none text-text-main" 
                      placeholder="Add tag..." 
                      type="text"
                      value={newTag}
                      onChange={e => setNewTag(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <button 
                      type="button"
                      onClick={handleAddTag}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-1 rounded-md hover:opacity-90 active:scale-95 transition-all animate-none"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Welcome Header */}
              <section className="space-y-1 text-left">
                <h2 className="font-display-lg text-headline-lg text-primary">მოგესალმებით, გიორგი</h2>
                <p className="font-body-md text-text-muted text-sm">
                  ინსტიტუტის მონაცემები დღევანდელი მდგომარეობით: {new Date().toLocaleDateString('ka-GE')}
                </p>
              </section>

              {/* Form Modal Box if Adding/Editing */}
              {showAddForm && (
                <div className="bg-[#EEF2EB] border border-outline-variant rounded-2xl p-6 space-y-6 text-left">
                  <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30">
                    <h3 className="text-lg font-bold text-primary">
                      {editingId ? 'მონაცემების რედაქტირება' : 'ახალი ჩანაწერის დამატება'}
                    </h3>
                    <button onClick={handleShowAddForm} className="text-text-muted hover:text-error transition-all">
                      <X size={18} />
                    </button>
                  </div>

              {errorMessage && <p className="text-sm font-bold text-error">{errorMessage}</p>}

              {/* Conditionally Render Form based on Active Tab */}
              {activeTab === 'courses' && (
                <form onSubmit={handleSaveCourse} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-primary">კურსის დასახელება</label>
                    <input
                      type="text" className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                      value={courseForm.title} onChange={e => setCourseForm({ ...courseForm, title: e.target.value })} required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary">ხანგრძლივობა</label>
                    <input
                      type="text" className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                      value={courseForm.duration} onChange={e => setCourseForm({ ...courseForm, duration: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary">კატეგორია</label>
                    <input
                      type="text" className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                      value={courseForm.category} onChange={e => setCourseForm({ ...courseForm, category: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary">სირთულე</label>
                    <select
                      className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                      value={courseForm.difficulty} onChange={e => setCourseForm({ ...courseForm, difficulty: e.target.value })}
                    >
                      <option value="დამწყები">დამწყები</option>
                      <option value="საშუალო">საშუალო</option>
                      <option value="პროფესიონალი">პროფესიონალი</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary">მოდულები (მძიმით გამოყოფილი)</label>
                    <input
                      type="text" className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                      value={courseForm.modules} onChange={e => setCourseForm({ ...courseForm, modules: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-primary">კურსის აღწერა</label>
                    <textarea
                      rows={3} className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                      value={courseForm.description} onChange={e => setCourseForm({ ...courseForm, description: e.target.value })} required
                    />
                  </div>
                  <button type="submit" className="md:col-span-2 bg-primary text-white py-3 rounded-xl font-bold hover:opacity-90">
                    შენახვა
                  </button>
                </form>
              )}

              {activeTab === 'content' && (
                <div className="space-y-6">
                  {contentSubTab === 'blogs' ? (
                    <form onSubmit={handleSaveBlog} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-primary">სტატიის სათაური</label>
                          <input
                            type="text" className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                            value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-primary">ავტორი</label>
                          <input
                            type="text" className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                            value={blogForm.author} onChange={e => setBlogForm({ ...blogForm, author: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-primary">სტატიის შინაარსი</label>
                        <textarea
                          rows={6} className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                          value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} required
                        />
                      </div>
                      <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:opacity-90">
                        ბლოგის გამოქვეყნება
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleSaveResource} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold text-primary">რესურსის დასახელება</label>
                        <input
                          type="text" className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                          value={resourceForm.title} onChange={e => setResourceForm({ ...resourceForm, title: e.target.value })} required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-primary">ავტორი</label>
                        <input
                          type="text" className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                          value={resourceForm.author} onChange={e => setResourceForm({ ...resourceForm, author: e.target.value })} required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-primary">ტიპი</label>
                        <select
                          className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                          value={resourceForm.type} onChange={e => setResourceForm({ ...resourceForm, type: e.target.value })}
                        >
                          <option value="წიგნი">წიგნი</option>
                          <option value="სტატია">სტატია</option>
                          <option value="კვლევა">კვლევა</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-primary">წელი</label>
                        <input
                          type="text" className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                          value={resourceForm.year} onChange={e => setResourceForm({ ...resourceForm, year: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold text-primary">მოკლე აღწერა</label>
                        <textarea
                          rows={3} className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                          value={resourceForm.description} onChange={e => setResourceForm({ ...resourceForm, description: e.target.value })}
                        />
                      </div>
                      <button type="submit" className="md:col-span-2 bg-primary text-white py-3 rounded-xl font-bold hover:opacity-90">
                        რესურსის შენახვა
                      </button>
                    </form>
                  )}
                </div>
              )}

              {activeTab === 'events' && (
                <form onSubmit={handleSaveEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-primary">ღონისძიების სათაური</label>
                    <input
                      type="text" className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                      value={eventForm.title} onChange={e => setEventForm({ ...eventForm, title: e.target.value })} required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary">თარიღი (მაგ: 12 ოქტ)</label>
                    <input
                      type="text" className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                      value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary">დრო (მაგ: 15:00)</label>
                    <input
                      type="text" className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                      value={eventForm.time} onChange={e => setEventForm({ ...eventForm, time: e.target.value })} required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary">ლოკაცია (მაგ: ოთახი 4 ან Zoom)</label>
                    <input
                      type="text" className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                      value={eventForm.location} onChange={e => setEventForm({ ...eventForm, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary">ფორმატი</label>
                    <select
                      className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                      value={eventForm.category} onChange={e => setEventForm({ ...eventForm, category: e.target.value as any })}
                    >
                      <option value="online">ონლაინ (Zoom)</option>
                      <option value="onsite">ადგილზე (ონსაიტ)</option>
                    </select>
                  </div>
                  <button type="submit" className="md:col-span-2 bg-primary text-white py-3 rounded-xl font-bold hover:opacity-90">
                    ღონისძიების დაგეგმვა
                  </button>
                </form>
              )}
            </div>
          )}

          {/* MAIN CMS TAB ROUTING */}
          
          {activeTab === 'dashboard' && (
            <div className="space-y-10 animate-fadeIn">
              
              {/* Stats Bento Grid */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-container-low p-8 rounded-xl border border-surface-container-high hover:shadow-md transition-all flex justify-between items-start">
                  <div>
                    <p className="font-label-md text-xs text-text-muted uppercase tracking-wider font-bold">სულ ბლოგები</p>
                    <h3 className="text-4xl font-headline-lg text-primary mt-2 font-bold">{totalBlogs}</h3>
                    <p className="text-[10px] text-secondary font-semibold mt-2 flex items-center">
                      აქტიური სტატიები საიტზე
                    </p>
                  </div>
                  <span className="p-3 bg-secondary-container text-on-secondary-container rounded-full">
                    <FileText size={20} />
                  </span>
                </div>

                <div className="bg-surface-container-low p-8 rounded-xl border border-surface-container-high hover:shadow-md transition-all flex justify-between items-start">
                  <div>
                    <p className="font-label-md text-xs text-text-muted uppercase tracking-wider font-bold">რეგისტრაციები</p>
                    <h3 className="text-4xl font-headline-lg text-primary mt-2 font-bold">{totalRegistrations}</h3>
                    <p className="text-[10px] text-secondary font-semibold mt-2">
                      {registrations.filter(r => r.status === 'pending').length} მოლოდინში
                    </p>
                  </div>
                  <span className="p-3 bg-tertiary-fixed text-on-tertiary-fixed rounded-full">
                    <CheckSquare size={20} />
                  </span>
                </div>

                <div className="bg-surface-container-low p-8 rounded-xl border border-surface-container-high hover:shadow-md transition-all flex justify-between items-start">
                  <div>
                    <p className="font-label-md text-xs text-text-muted uppercase tracking-wider font-bold">შეტყობინებები</p>
                    <h3 className="text-4xl font-headline-lg text-primary mt-2 font-bold">{inquiries.length}</h3>
                    <p className="text-[10px] text-error font-semibold mt-2 flex items-center">
                      <AlertTriangle size={10} className="mr-1" />
                      {urgentInquiries} გადაუდებელი შეტყობინება
                    </p>
                  </div>
                  <span className="p-3 bg-primary-fixed text-on-primary-fixed rounded-full">
                    <Bell size={20} />
                  </span>
                </div>
              </section>

              {/* Splitted Activity Feed and Sidebars */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-xl font-headline-md text-primary font-bold">ინსტიტუტის ბოლო აქტივობები</h3>
                  <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm">
                    <div className="divide-y divide-outline-variant/20">
                      {/* Active course registrations list */}
                      {registrations.length === 0 ? (
                        <p className="p-6 text-sm text-text-muted text-center">აქტივობები ჯერ არ ფიქსირდება</p>
                      ) : (
                        registrations.slice(-4).reverse().map((reg) => (
                          <div key={reg.id} className="p-6 flex items-start space-x-4 hover:bg-surface-muted transition-all">
                            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0 text-on-secondary-container">
                              <CheckSquare size={16} />
                            </div>
                            <div className="flex-grow">
                              <p className="text-sm text-on-surface">
                                მომხმარებელმა <strong className="font-bold">{reg.userName}</strong> გაგზავნა რეგისტრაციის მოთხოვნა კურსზე: <span className="italic font-semibold text-primary">"{reg.courseTitle}"</span>
                              </p>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-[10px] text-text-muted">{new Date(reg.createdAt).toLocaleDateString()}</span>
                                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                  reg.status === 'approved' ? 'bg-secondary-container text-on-secondary-container' : reg.status === 'rejected' ? 'bg-error-container text-error' : 'bg-tertiary-fixed text-on-tertiary-fixed'
                                }`}>
                                  {reg.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Inquiries / User Messages */}
                  <h3 className="text-xl font-headline-md text-primary font-bold mt-8">შემოსული შეტყობინებები</h3>
                  <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm">
                    <div className="divide-y divide-outline-variant/20">
                      {inquiries.length === 0 ? (
                        <p className="p-6 text-sm text-text-muted text-center">შეტყობინებები არ არის</p>
                      ) : (
                        inquiries.map((inq) => (
                          <div key={inq.id} className="p-6 space-y-2 hover:bg-surface-muted transition-all text-left">
                            <div className="flex justify-between items-center">
                              <strong className="text-sm text-on-surface">{inq.name} ({inq.email})</strong>
                              <div className="flex gap-2">
                                {inq.status !== 'read' && (
                                  <button
                                    onClick={() => handleUpdateInquiry(inq.id, 'read')}
                                    className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-bold"
                                  >
                                    წაკითხულად
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteInquiry(inq.id)}
                                  className="text-[10px] text-error hover:underline font-bold"
                                >
                                  წაშლა
                                </button>
                              </div>
                            </div>
                            <p className="text-xs text-text-muted leading-relaxed">{inq.message}</p>
                            <span className="text-[9px] text-text-muted block">{new Date(inq.createdAt).toLocaleDateString()}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar Quick Actions and Event widgets */}
                <div className="space-y-8">
                  {/* Quick Actions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-headline-md text-primary font-bold">სწრაფი ქმედებები (Quick Management)</h3>
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => { setActiveTab('content'); setContentSubTab('blogs'); handleShowAddForm(); }}
                        className="flex items-center p-3.5 bg-primary text-on-primary rounded-xl shadow-sm hover:-translate-y-0.5 transition-all text-left text-xs font-bold cursor-pointer"
                      >
                        <Plus className="mr-2.5 shrink-0" size={16} />
                        + ბლოგ პოსტის დამატება
                      </button>
                      <button
                        onClick={() => { setActiveTab('media'); triggerToast('მედიის ატვირთვის ფანჯარა გახსნილია'); }}
                        className="flex items-center p-3.5 bg-surface-container-high text-on-surface rounded-xl shadow-sm hover:-translate-y-0.5 transition-all text-left text-xs font-bold cursor-pointer border border-outline-variant/30"
                      >
                        <Image className="mr-2.5 text-tertiary-container shrink-0" size={16} />
                        + მედიის & ვიდეოს ატვირთვა
                      </button>
                      <button
                        onClick={() => { setActiveTab('courses'); handleShowAddForm(); }}
                        className="flex items-center p-3.5 bg-surface-container-high text-on-surface rounded-xl shadow-sm hover:-translate-y-0.5 transition-all text-left text-xs font-bold cursor-pointer border border-outline-variant/30"
                      >
                        <GraduationCap className="mr-2.5 text-tertiary-container shrink-0" size={16} />
                        + ახალი კურსის დამატება
                      </button>
                      <button
                        onClick={() => { setActiveTab('events'); handleShowAddForm(); }}
                        className="flex items-center p-3.5 bg-surface-container-high text-on-surface rounded-xl shadow-sm hover:-translate-y-0.5 transition-all text-left text-xs font-bold cursor-pointer border border-outline-variant/30"
                      >
                        <Plus className="mr-2.5 text-tertiary-container shrink-0" size={16} />
                        + ღონისძიების დამატება
                      </button>
                      <button
                        onClick={() => { setActiveTab('content'); setContentSubTab('resources'); handleShowAddForm(); }}
                        className="flex items-center p-3.5 bg-surface-container-high text-on-surface rounded-xl shadow-sm hover:-translate-y-0.5 transition-all text-left text-xs font-bold cursor-pointer border border-outline-variant/30"
                      >
                        <FileText className="mr-2.5 text-tertiary-container shrink-0" size={16} />
                        + ბიბლიოთეკის რესურსის დამატება
                      </button>
                      <button
                        onClick={() => { setActiveTab('users'); }}
                        className="flex items-center p-3.5 bg-surface-container-high text-on-surface rounded-xl shadow-sm hover:-translate-y-0.5 transition-all text-left text-xs font-bold cursor-pointer border border-outline-variant/30"
                      >
                        <Users className="mr-2.5 text-tertiary-container shrink-0" size={16} />
                        + მომხმარებელთა მართვა
                      </button>
                    </div>
                  </div>

                  {/* Upcoming events card widgets */}
                  <div className="bg-surface-muted p-6 rounded-2xl border border-outline-variant/30 space-y-4">
                    <h4 className="text-md font-headline-md text-primary font-bold">უახლოესი ღონისძიებები</h4>
                    <div className="space-y-4">
                      {events.slice(0, 2).map((ev) => (
                        <div key={ev.id} className="flex space-x-3">
                          <div className="flex flex-col items-center justify-center bg-tertiary-container text-on-tertiary-container w-12 h-12 rounded-lg shrink-0 font-bold">
                            <span className="text-[8px] uppercase tracking-wider opacity-85">თარიღი</span>
                            <span className="text-sm">{ev.date.split(' ')[0]}</span>
                          </div>
                          <div>
                            <p className="font-label-md text-xs text-on-surface font-bold leading-tight">{ev.title}</p>
                            <p className="text-[10px] text-text-muted mt-1">{ev.time} - {ev.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Content (Blogs & Resources library) */}
          {activeTab === 'content' && (!showAddForm || contentSubTab !== 'blogs') && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-headline-md text-primary font-bold">კონტენტის მართვა (ბლოგი და ბიბლიოთეკა)</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setContentSubTab('blogs')}
                    className={`text-xs px-4 py-2.5 rounded-xl font-bold transition-all ${contentSubTab === 'blogs' ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface'}`}
                  >
                    ბლოგები
                  </button>
                  <button
                    onClick={() => setContentSubTab('resources')}
                    className={`text-xs px-4 py-2.5 rounded-xl font-bold transition-all ${contentSubTab === 'resources' ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface'}`}
                  >
                    ბიბლიოთეკა
                  </button>
                  <button
                    type="button"
                    onClick={() => { setContentSubTab('blogs'); setShowAddForm(true); clearForms(); }}
                    className="bg-primary text-white text-xs px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md hover:opacity-90 transition-all cursor-pointer"
                  >
                    <Plus size={16} />
                    + ახალი ბლოგ პოსტის დამატება
                  </button>
                </div>
              </div>

              {contentSubTab === 'blogs' ? (
                <div className="bg-white/5 border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-surface-container-high text-xs font-bold text-primary border-b border-outline-variant">
                        <th className="p-4 pl-6">სტატიის სათაური</th>
                        <th className="p-4">ავტორი</th>
                        <th className="p-4">თარიღი</th>
                        <th className="p-4">სტატუსი</th>
                        <th className="p-4 pr-6 text-right">მოქმედება</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {filteredBlogs.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-text-muted text-sm">
                            ბლოგ პოსტები ჯერ არ არის დამატებული.
                          </td>
                        </tr>
                      ) : (
                        filteredBlogs.map((b) => (
                          <tr key={b.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 pl-6 font-semibold text-on-surface flex items-center gap-2">
                              <span className="material-symbols-outlined text-tertiary text-base">article</span>
                              <span>{b.title}</span>
                            </td>
                            <td className="p-4 text-xs font-medium text-primary">{b.author}</td>
                            <td className="p-4 text-xs text-text-muted">{new Date(b.createdAt).toLocaleDateString('ka-GE')}</td>
                            <td className="p-4 text-xs">
                              <span className="bg-tertiary-container/20 text-tertiary-fixed px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                გამოქვეყნებული
                              </span>
                            </td>
                            <td className="p-4 pr-6 text-right space-x-2">
                              <button
                                type="button"
                                onClick={() => triggerToast(`სტატია: "${b.title}" (ავტორი: ${b.author})`)}
                                className="p-1.5 rounded-lg bg-surface-container-high text-on-surface hover:bg-primary/10 transition-all inline-flex"
                                title="ნახვა / Preview"
                              >
                                <span className="material-symbols-outlined text-sm">visibility</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleEditBlog(b)}
                                className="p-1.5 rounded-lg bg-tertiary-container/10 text-tertiary-container hover:bg-tertiary-container/20 transition-all inline-flex"
                                title="რედაქტირება"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteBlog(b.id)}
                                className="p-1.5 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-all inline-flex"
                                title="წაშლა"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-white/5 border border-outline-variant/30 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-surface-container-high text-xs font-bold text-primary border-b border-outline-variant">
                        <th className="p-4 pl-6">რესურსის სათაური</th>
                        <th className="p-4">ავტორი</th>
                        <th className="p-4">ტიპი</th>
                        <th className="p-4">წელი</th>
                        <th className="p-4 pr-6 text-right">მოქმედება</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {filteredResources.map((r) => (
                        <tr key={r.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 pl-6 font-semibold text-on-surface">{r.title}</td>
                          <td className="p-4 text-xs">{r.author}</td>
                          <td className="p-4 text-xs">{r.type}</td>
                          <td className="p-4 text-xs">{r.year}</td>
                          <td className="p-4 pr-6 text-right space-x-2">
                            <button
                              onClick={() => handleEditResource(r)}
                              className="p-1.5 rounded-lg bg-tertiary-container/10 text-tertiary-container hover:bg-tertiary-container/20 transition-all inline-flex"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteResource(r.id)}
                              className="p-1.5 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-all inline-flex"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Courses (Programs) */}
          {activeTab === 'courses' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-headline-md text-primary font-bold">აკადემიური პროგრამები</h3>
                <button
                  onClick={handleShowAddForm}
                  className="bg-primary text-white text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  ახალი კურსი
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((c) => (
                  <div key={c.id} className="bg-surface-container-low p-6 rounded-2xl border border-surface-container-high flex flex-col justify-between hover:shadow-md transition-all">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] bg-tertiary-container/20 text-tertiary-container px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">
                          {c.difficulty}
                        </span>
                        <span className="text-xs text-text-muted font-bold">{c.duration}</span>
                      </div>
                      
                      <h4 className="text-lg font-bold text-primary">{c.title}</h4>
                      <p className="text-xs text-text-muted leading-relaxed line-clamp-3">{c.description}</p>
                      
                      <div className="flex flex-wrap gap-1 pt-2">
                        {c.modules.map((m, idx) => (
                          <span key={idx} className="bg-white/5 border border-outline-variant/30 text-[10px] px-2 py-0.5 rounded-md">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-3 border-t border-outline-variant/20">
                      <button
                        onClick={() => handleEditCourse(c)}
                        className="px-3 py-1.5 rounded-lg border border-outline-variant hover:bg-white/10 text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <Edit size={12} />
                        შეცვლა
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(c.id)}
                        className="px-3 py-1.5 rounded-lg bg-error-container/10 border border-error/20 hover:bg-error-container/20 text-error text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <Trash2 size={12} />
                        წაშლა
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Media Library & Asset Inspector */}
          {activeTab === 'media' && (
            <div className="space-y-8 animate-fadeIn text-left">
              {/* Header & Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/20 pb-6">
                <div>
                  <h3 className="text-2xl font-headline-md text-primary font-bold">მედია ბიბლიოთეკა</h3>
                  <p className="text-xs text-text-muted mt-1">ინსტიტუტის ციფრული აქტივების, ფოტოებისა და დოკუმენტების მართვა</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => triggerToast('ფაილის ატვირთვის ფანჯარა გახსნილია')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-label-md text-xs font-bold hover:shadow-lg transition-all cursor-pointer"
                  >
                    <Upload size={14} />
                    ატვირთვა
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Media Grid & Folders */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Folders Navigation */}
                  <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-xl text-xs font-bold text-primary whitespace-nowrap">
                      <span className="material-symbols-outlined text-base">folder</span>
                      სასწავლო მასალები
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-surface-container transition-colors rounded-xl text-xs font-semibold text-text-muted whitespace-nowrap">
                      <span className="material-symbols-outlined text-base">folder</span>
                      ფოტოგალერეა
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-surface-container transition-colors rounded-xl text-xs font-semibold text-text-muted whitespace-nowrap">
                      <span className="material-symbols-outlined text-base">folder</span>
                      პრეს-რელიზები
                    </button>
                    <button onClick={() => triggerToast('ახალი საქაღალდის შექმნა')} className="ml-auto text-primary text-xs font-bold flex items-center gap-1 hover:underline whitespace-nowrap">
                      <Plus size={14} />
                      ახალი საქაღალდე
                    </button>
                  </div>

                  {/* Assets Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {/* Photo Asset 1 */}
                    <div 
                      onClick={() => triggerToast('არჩეულია: mountain-retreat.jpg')}
                      className="group relative bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-outline-variant/30 hover:border-primary"
                    >
                      <div className="aspect-square bg-surface-container relative overflow-hidden">
                        <img 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          alt="Mountain retreat" 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8joFHc8xZbl5j5NlCVWg9_fNVGL4TJSKoBDA9B666QvcHNzCb8OLJZcgzkXWTL7iTMmSP0bUrE5-rvuFsR3MB1R4CMkPBcZCdiKm3xrVF82nLzVW30HBb_TKOayiz0vrkCpu2nvln9teKg0UAX4ASPyfDrWptNOqmnScXvEfE2MZgCS8Y_6jYR1eipxY8CbhO1ZiDZG3PWFsyRY1IZmVWdcLgbdiPqLerIL54okwXWhPFjsyTetnH"
                        />
                        <span className="absolute top-2 right-2 bg-secondary-container text-on-secondary-container text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">Published</span>
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-bold truncate text-on-surface">mountain-retreat.jpg</p>
                        <p className="text-[10px] text-text-muted mt-0.5">JPG • 2.4 MB • 24 მაისი, 2024</p>
                      </div>
                    </div>

                    {/* PDF Asset Document */}
                    <div 
                      onClick={() => triggerToast('არჩეულია: ფსიქოსინთეზის_საფუძვლები.pdf')}
                      className="group relative bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-outline-variant/30 hover:border-primary"
                    >
                      <div className="aspect-square bg-surface-muted flex flex-col items-center justify-center relative p-4">
                        <span className="material-symbols-outlined text-5xl text-error opacity-60">description</span>
                        <span className="text-[10px] font-bold text-error/80 mt-2 uppercase tracking-widest">PDF Document</span>
                        <span className="absolute top-2 right-2 bg-surface-container-highest text-text-muted text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">Draft</span>
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-bold truncate text-on-surface">ფსიქოსინთეზის_საფუძვლები.pdf</p>
                        <p className="text-[10px] text-text-muted mt-0.5">PDF • 1.1 MB • 22 მაისი, 2024</p>
                      </div>
                    </div>

                    {/* Video Asset */}
                    <div 
                      onClick={() => triggerToast('არჩეულია: ლექცია-01.mp4')}
                      className="group relative bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-outline-variant/30 hover:border-primary"
                    >
                      <div className="aspect-square bg-surface-container relative overflow-hidden">
                        <img 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          alt="Lecture video" 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9XVpARdyjI2jB_STYdTKlE3JrSnTCvZhvqxvaxAMsQJ_rwAcXx-e4ZWzb1OK1uYNahO69VdJcM6RrIIW-fcvy8VwM8RdmIVAj9BUR5mOluwfgYxF5SeK_TX5HoE1VLpPmvlY3Nbh8cuZvx5IBk1zYaQ-t29JfhHME2FkpWNv2M5fSg9rK5UA_7rs25xRLmUhPniDogPZZ1wcpYYRW0mpnLtNprmfHgmSW9eLetX-cPT-ew2wo36Hk"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: `'FILL' 1` }}>play_circle</span>
                        </div>
                        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[9px] px-2 py-0.5 rounded font-mono">12:45</span>
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-bold truncate text-on-surface">ლექცია-01.mp4</p>
                        <p className="text-[10px] text-text-muted mt-0.5">VIDEO • 145 MB • 20 მაისი, 2024</p>
                      </div>
                    </div>

                    {/* Faculty Member Photo */}
                    <div 
                      onClick={() => triggerToast('არჩეულია: faculty-member-01.jpg')}
                      className="group relative bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-outline-variant/30 hover:border-primary"
                    >
                      <div className="aspect-square bg-surface-container relative overflow-hidden">
                        <img 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          alt="Faculty member" 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVm99rlDYzl-dfrJclyf1X9nARgDHRuakoFAdP0rsG_9tOUVYyWGXIPZEjGzVSLYWYIyeAeth3cD2p7fYZ1hq2M1BO9LkVT_5bdEgdpvcND4mR10r1Gbl1TrbkmV_7k11WFnBU29DVPbdIiYKcFe2NlF8RqZpLQanWfrK9aQPmLynMKU2vJfhnGoe-0oVmsrBC5sWBqq_rDbmFatYbVzoS1Wt-18t_S1ql3ydeJXFAKjiq383kcLf2"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-bold truncate text-on-surface">faculty-member-01.jpg</p>
                        <p className="text-[10px] text-text-muted mt-0.5">JPG • 1.8 MB • 18 მაისი, 2024</p>
                      </div>
                    </div>

                    {/* Vimeo Embed */}
                    <div 
                      onClick={() => triggerToast('არჩეულია: ინსტიტუტის_ტურის_ვიდეო')}
                      className="group relative bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-outline-variant/30 hover:border-primary"
                    >
                      <div className="aspect-square bg-surface-muted flex flex-col items-center justify-center p-4">
                        <span className="material-symbols-outlined text-4xl text-primary opacity-60" style={{ fontVariationSettings: `'FILL' 1` }}>movie</span>
                        <span className="text-[10px] font-bold text-primary mt-2 uppercase tracking-widest">Vimeo Embed</span>
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-bold truncate text-on-surface">ინსტიტუტის_ტურის_ვიდეო</p>
                        <p className="text-[10px] text-text-muted mt-0.5">EMBED • 15 მაისი, 2024</p>
                      </div>
                    </div>

                    {/* PNG Asset */}
                    <div 
                      onClick={() => triggerToast('არჩეულია: untitled-asset.png')}
                      className="group relative bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-outline-variant/30 hover:border-primary"
                    >
                      <div className="aspect-square bg-surface-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-outline-variant">image</span>
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-bold truncate text-on-surface">untitled-asset.png</p>
                        <p className="text-[10px] text-text-muted mt-0.5">PNG • 450 KB • 12 მაისი, 2024</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Inspector Sidebar */}
                <div className="lg:col-span-4 bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 space-y-6 shadow-sm h-fit">
                  <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
                    <h4 className="font-headline-md text-base font-bold text-primary">ფაილის დეტალები</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded-full uppercase">Published</span>
                  </div>

                  {/* Preview Area */}
                  <div className="rounded-xl overflow-hidden bg-white shadow-sm aspect-video flex items-center justify-center border border-outline-variant/20 relative">
                    <img 
                      className="w-full h-full object-cover" 
                      alt="Selected asset preview" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuChSFtD616TEmIkF2F7tP5NgxmnvoAfD2C6-EQ5GmHrwFrCXlojbTi2yizCJsLGxrQNma8EIsbRZ1z8XdWfW6LwI7u0FuDzCtAdPilAbum86Mn1dp-SkoFc6KPZzWC1z6wSKMq2X4D1b_GCWqjXrZhEuEDb2G2io_HBeJ9_VU7AqWeMjyz6IxzxLxDhgjO3op5PIynY8P9HjnKnXgz8KsAWl65YTVjhtF2Ad2FaAvTc_0Lg0rZ5dJ_e"
                    />
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-text-muted mb-1">ფაილის სახელი</label>
                      <input 
                        className="w-full bg-white border border-outline-variant/30 rounded-xl px-3 py-2 text-xs font-semibold text-on-surface" 
                        type="text" 
                        defaultValue="mountain-retreat.jpg"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-text-muted mb-1">Alt ტექსტი (Prompt)</label>
                      <textarea 
                        className="w-full bg-white border border-outline-variant/30 rounded-xl p-3 text-xs leading-relaxed text-on-surface" 
                        rows={3}
                        defaultValue="მთის ხედი ოქროს საათზე, რომელიც ასახავს სიმშვიდეს და აკადემიურ ატმოსფეროს..."
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-text-muted mb-2">თეგები</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full flex items-center gap-1">
                          ბუნება <X size={10} className="cursor-pointer" />
                        </span>
                        <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full flex items-center gap-1">
                          თერაპია <X size={10} className="cursor-pointer" />
                        </span>
                      </div>
                      <input 
                        className="w-full bg-white border border-outline-variant/30 rounded-xl px-3 py-2 text-xs" 
                        placeholder="დაამატეთ თეგი..." 
                        type="text"
                      />
                    </div>

                    <div className="pt-4 border-t border-outline-variant/20 flex gap-3">
                      <button 
                        onClick={() => triggerToast('მონაცემები წარმატებით შენახულია')}
                        className="flex-1 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-bold hover:shadow-md transition-all cursor-pointer"
                      >
                        შენახვა
                      </button>
                      <button 
                        onClick={() => triggerToast('ფაილი წაშლილია')}
                        className="p-2.5 border border-error/30 text-error rounded-xl hover:bg-error/10 transition-all cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="bg-surface-muted rounded-xl p-4 space-y-2 text-[11px] text-text-muted border border-outline-variant/20">
                      <h5 className="text-[10px] font-bold text-primary uppercase tracking-widest">მეტამონაცემები</h5>
                      <div className="flex justify-between"><span>ზომა:</span> <span className="font-semibold text-on-surface">1920 × 1080</span></div>
                      <div className="flex justify-between"><span>ტიპი:</span> <span className="font-semibold text-on-surface">image/jpeg</span></div>
                      <div className="flex justify-between"><span>ავტორი:</span> <span className="font-semibold text-on-surface">Admin User</span></div>
                      <div className="flex justify-between"><span>ID:</span> <span className="font-semibold text-on-surface">#ASSET-0922</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Events & Public Activities */}
          {activeTab === 'events' && (
            <div className="space-y-12 animate-fadeIn text-left">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-headline-md text-primary font-bold">საჯარო აქტივობები და ღონისძიებები</h3>
                  <p className="text-xs text-text-muted mt-1">ღონისძიებების კალენდარი, სემინარები და რეგისტრაციები</p>
                </div>
                <button
                  onClick={handleShowAddForm}
                  className="bg-primary text-white text-xs px-5 py-2.5 rounded-xl font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus size={14} />
                  ახალი ღონისძიება
                </button>
              </div>

              {/* Bento Grid Featured Events */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Featured Event Card */}
                <div className="md:col-span-8 group relative overflow-hidden rounded-2xl bg-surface-container-low shadow-lg border border-outline-variant/30 hover:shadow-2xl transition-all duration-500">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-1/2 h-56 md:h-auto overflow-hidden relative">
                      <img 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        alt="Therapeutic setting workshop" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBurwOZ0yspCyz7pgCieTdg0I39WTSBX-bDcR3Y-AlsSIv8CktWk70ISeZj6EQFrhMjYvA16kVp87vMwtdY1fy7RUWLLG-c-6KYyfuWQG7T6BpRQTRYRogluhk_0xhmvlGQsR7-morQNl9tswzbIEUolc9vbBTRTaJzaym-UprkY98LIDzbjIUeMf_UEuiWyx0qBgCy6XxitnWS-TvuENQJu_lkEk6pAeV9CqlpXf3HaLGhIl5NEJwo"
                      />
                    </div>
                    <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            ინტენსიური
                          </span>
                          <span className="text-tertiary font-headline-md text-lg font-bold">250 ₾</span>
                        </div>
                        <h3 className="font-headline-lg text-lg font-bold text-primary leading-snug group-hover:text-tertiary transition-colors">
                          ფსიქოსინთეზის საფუძვლები: პიროვნული ტრანსფორმაცია
                        </h3>
                        <div className="space-y-1.5 text-text-muted text-xs">
                          <p>📅 15 - 17 ნოემბერი, 2024</p>
                          <p>👤 ტრენერი: მარიამ ბერაძე</p>
                          <p>📍 თბილისი, ინსტიტუტის დარბაზი</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => triggerToast('რეგისტრაცია დადასტურებულია')}
                        className="bg-primary text-on-primary w-full py-2.5 rounded-xl font-label-md text-xs font-bold hover:shadow-lg transition-all cursor-pointer"
                      >
                        რეგისტრაცია
                      </button>
                    </div>
                  </div>
                </div>

                {/* Secondary Event Card */}
                <div className="md:col-span-4 bg-surface-muted p-6 rounded-2xl flex flex-col justify-between border border-outline-variant/30 space-y-4 shadow-sm">
                  <div className="space-y-3">
                    <div className="text-tertiary font-headline-md text-[10px] font-bold uppercase tracking-widest">ონლაინ ვებინარი</div>
                    <h4 className="font-headline-md text-base font-bold text-primary">სიზმრების სიმბოლიკა და ქვეცნობიერი</h4>
                    <p className="text-text-muted text-xs leading-relaxed">
                      შეისწავლეთ თქვენი შინაგანი სამყაროს ენა თერაპევტებთან ერთად.
                    </p>
                    <div className="space-y-1 pt-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-text-muted">თარიღი:</span>
                        <span className="text-primary font-bold">20 ნოემბერი</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">ფასი:</span>
                        <span className="text-tertiary font-bold">50 ₾</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => triggerToast('ადგილი დაჯავშნილია!')}
                    className="border-2 border-primary text-primary w-full py-2.5 rounded-xl font-label-md text-xs font-bold hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                  >
                    ადგილის დაჯავშნა
                  </button>
                </div>
              </div>

              {/* Management Table */}
              <div className="space-y-4 pt-4">
                <h4 className="text-lg font-bold text-primary">ღონისძიებების სია და მართვა</h4>
                <div className="bg-white/5 border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-surface-container-high text-xs font-bold text-primary border-b border-outline-variant">
                        <th className="p-4 pl-6">ღონისძიება</th>
                        <th className="p-4">თარიღი</th>
                        <th className="p-4">დრო</th>
                        <th className="p-4">ლოკაცია</th>
                        <th className="p-4">ფორმატი</th>
                        <th className="p-4 pr-6 text-right">მოქმედება</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {events.map((ev) => (
                        <tr key={ev.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 pl-6 font-semibold text-on-surface">{ev.title}</td>
                          <td className="p-4 text-xs font-bold">{ev.date}</td>
                          <td className="p-4 text-xs">{ev.time}</td>
                          <td className="p-4 text-xs">{ev.location}</td>
                          <td className="p-4 text-xs">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              ev.category === 'online' ? 'bg-secondary-container text-on-secondary-container' : 'bg-tertiary-fixed text-on-tertiary-fixed'
                            }`}>
                              {ev.category === 'online' ? 'ონლაინ' : 'ადგილზე'}
                            </span>
                          </td>
                          <td className="p-4 pr-6 text-right space-x-2">
                            <button
                              onClick={() => handleEditEvent(ev)}
                              className="p-1.5 rounded-lg bg-tertiary-container/10 text-tertiary-container hover:bg-tertiary-container/20 transition-all inline-flex"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(ev.id)}
                              className="p-1.5 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-all inline-flex"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: Course Registrations */}
          {activeTab === 'registrations' && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-xl font-headline-md text-primary font-bold">კურსების რეგისტრაციის მოთხოვნები</h3>
              
              <div className="bg-white/5 border border-outline-variant/30 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-surface-container-high text-xs font-bold text-primary border-b border-outline-variant">
                      <th className="p-4 pl-6">მომხმარებელი</th>
                      <th className="p-4">კურსის სათაური</th>
                      <th className="p-4">მოთხოვნის თარიღი</th>
                      <th className="p-4">სტატუსი</th>
                      <th className="p-4 pr-6 text-right">მოქმედება</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {registrations.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-text-muted text-sm">
                          რეგისტრაციის მოთხოვნები არ არის.
                        </td>
                      </tr>
                    ) : (
                      registrations.slice().reverse().map((reg) => (
                        <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 pl-6 font-bold text-on-surface">{reg.userName}</td>
                          <td className="p-4 text-xs font-semibold text-primary">{reg.courseTitle}</td>
                          <td className="p-4 text-xs">{new Date(reg.createdAt).toLocaleDateString()}</td>
                          <td className="p-4 text-xs">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              reg.status === 'approved' 
                                ? 'bg-secondary-container text-on-secondary-container' 
                                : reg.status === 'rejected' 
                                ? 'bg-error-container text-error' 
                                : 'bg-tertiary-fixed text-on-tertiary-fixed'
                            }`}>
                              {reg.status === 'approved' ? 'დადასტურებული' : reg.status === 'rejected' ? 'უარყოფილი' : 'მოლოდინში'}
                            </span>
                          </td>
                          <td className="p-4 pr-6 text-right space-x-2">
                            {reg.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleUpdateRegistration(reg.id, 'approved')}
                                  className="px-2.5 py-1.5 rounded-lg bg-secondary text-white text-xs font-bold hover:bg-secondary/90 transition-all"
                                >
                                  დადასტურება
                                </button>
                                <button
                                  onClick={() => handleUpdateRegistration(reg.id, 'rejected')}
                                  className="px-2.5 py-1.5 rounded-lg bg-error text-white text-xs font-bold hover:bg-error/90 transition-all"
                                >
                                  უარყოფა
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleDeleteRegistration(reg.id)}
                              className="p-1.5 rounded-lg bg-error-container/15 text-error hover:bg-error-container/30 transition-all inline-flex"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 7: Users Manager */}
          {activeTab === 'users' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-headline-md text-primary font-bold">მომხმარებელთა მართვა (User Accounts Management)</h3>
                <button
                  type="button"
                  onClick={() => {
                    const name = prompt('შეიყვანეთ მომხმარებლის სახელი:');
                    const username = prompt('შეიყვანეთ username:');
                    if (name && username) {
                      triggerToast(`მომხმარებელი "${name}" წარმატებით დაემატა`);
                    }
                  }}
                  className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus size={14} />
                  + მომხმარებლის დამატება
                </button>
              </div>
              
              <div className="bg-white/5 border border-outline-variant/30 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-surface-container-high text-xs font-bold text-primary border-b border-outline-variant">
                      <th className="p-4 pl-6">სახელი</th>
                      <th className="p-4">მომხმარებლის სახელი (username)</th>
                      <th className="p-4">როლი</th>
                      <th className="p-4 pr-6 text-right">მოქმედება</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 pl-6 font-bold text-on-surface">{u.name}</td>
                        <td className="p-4 text-xs font-semibold">{u.username}</td>
                        <td className="p-4 text-xs">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            u.role === 'admin' ? 'bg-tertiary-container text-primary-container' : 'bg-white/5 text-text-muted border border-outline-variant/35'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4 pr-6 text-right space-x-2">
                          <button
                            onClick={() => handleToggleAdmin(u)}
                            className="px-2.5 py-1 rounded-lg border border-outline-variant/40 text-xs font-bold hover:bg-white/10 transition-all"
                          >
                            როლის შეცვლა
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-1.5 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-all inline-flex"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 8: SEO Manager */}
          {activeTab === 'seo' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
              {/* Form editing */}
              <div className="lg:col-span-5 bg-surface-container-low p-6 rounded-2xl border border-surface-container-high space-y-4">
                <h3 className="text-md font-bold text-primary border-b border-outline-variant/20 pb-2">
                  SEO პარამეტრების შეცვლა
                </h3>
                
                {successMessage && <p className="text-xs font-bold text-secondary-fixed text-center">{successMessage}</p>}

                <form onSubmit={handleSaveSeo} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary block">გვერდის მისამართი (Path)</label>
                    <select
                      className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                      value={seoForm.path} onChange={e => setSeoForm({ ...seoForm, path: e.target.value })}
                    >
                      <option value="/">მთავარი (/)</option>
                      <option value="/workspace">სამუშაო სივრცე (/workspace)</option>
                      <option value="/practice">მედიტაციის ოთახი (/practice)</option>
                      <option value="/academic">აკადემიური პორტალი (/academic)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary block">გვერდის სათაური (Title Tag)</label>
                    <input
                      type="text" className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                      value={seoForm.title} onChange={e => setSeoForm({ ...seoForm, title: e.target.value })} required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary block">აღწერა (Meta Description)</label>
                    <textarea
                      rows={3} className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                      value={seoForm.description} onChange={e => setSeoForm({ ...seoForm, description: e.target.value })} required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary block">საკვანძო სიტყვები (Keywords)</label>
                    <input
                      type="text" className="w-full bg-white border border-outline-variant rounded-xl p-2.5 text-sm"
                      value={seoForm.keywords} onChange={e => setSeoForm({ ...seoForm, keywords: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-1.5">
                    <Save size={16} />
                    პარამეტრების შენახვა
                  </button>
                </form>
              </div>

              {/* SEO configurations listing */}
              <div className="lg:col-span-7 bg-white/5 border border-outline-variant/30 rounded-2xl p-6 space-y-4">
                <h3 className="text-md font-bold text-primary">არსებული SEO რუკა</h3>
                <div className="space-y-4">
                  {seoSettings.map((seo) => (
                    <div key={seo.path} className="p-4 bg-surface-container-low border border-outline-variant/20 rounded-xl space-y-2 hover:border-tertiary-container/30 transition-all">
                      <div className="flex justify-between items-center pb-1 border-b border-outline-variant/20">
                        <span className="text-xs font-bold text-tertiary-container">{seo.path}</span>
                        <button
                          onClick={() => handleEditSeo(seo)}
                          className="text-[10px] text-primary hover:underline font-bold flex items-center gap-1"
                        >
                          <Edit size={10} />
                          რედაქტირება
                        </button>
                      </div>
                      <p className="text-xs font-bold text-on-surface">Title: {seo.title}</p>
                      <p className="text-[10px] text-text-muted leading-relaxed line-clamp-2">Desc: {seo.description}</p>
                      <p className="text-[9px] text-text-muted italic">Keywords: {seo.keywords}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 9: Site Settings & Dynamic Texts Manager */}
          {activeTab === 'site' && (
            <div className="bg-surface-container-low p-8 rounded-2xl border border-surface-container-high space-y-8 animate-fadeIn text-left">
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
                <div>
                  <h3 className="text-xl font-headline-md font-bold text-primary">საიტის ტექსტები & ნავბარის მართვა (Site Content Manager)</h3>
                  <p className="text-xs text-text-muted mt-1">მართეთ მთავარი გვერდის, ნავბარისა და ფუტერის ყველა ტექსტი ადმინ პანელიდან.</p>
                </div>
                <button 
                  type="button" 
                  onClick={handleSaveSiteSettings}
                  className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Save size={16} />
                  ტექსტების შენახვა
                </button>
              </div>

              <form onSubmit={handleSaveSiteSettings} className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-md font-bold text-tertiary-container border-b border-outline-variant/20 pb-2">1. ნავბარი & ჩამოსაშლელი მენიუს ქვეთავები (Navbar Navigation & Subtabs)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">ბრენდის დასახელება (Brand Title)</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-semibold border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.siteTitle} onChange={e => setSiteSettings({ ...siteSettings, siteTitle: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">მენიუ: მთავარი</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-semibold border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.navHome} onChange={e => setSiteSettings({ ...siteSettings, navHome: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">მენიუ: ჩვენ შესახებ (Dropdown)</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-semibold border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.navAboutDropdown} onChange={e => setSiteSettings({ ...siteSettings, navAboutDropdown: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">ქვემენიუ: ინსტიტუტის ისტორია</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-semibold border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.navHistory} onChange={e => setSiteSettings({ ...siteSettings, navHistory: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">ქვემენიუ: დამფუძნებელი</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-semibold border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.navFounder} onChange={e => setSiteSettings({ ...siteSettings, navFounder: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">ქვემენიუ: ტრენერები</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-semibold border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.navTrainers} onChange={e => setSiteSettings({ ...siteSettings, navTrainers: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">მენიუ: აკადემიური პორტალი</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-semibold border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.navAcademic} onChange={e => setSiteSettings({ ...siteSettings, navAcademic: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">მენიუ: საჯარო აქტივობები</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-semibold border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.navEvents} onChange={e => setSiteSettings({ ...siteSettings, navEvents: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">მენიუ: მედიტაციის ოთახი</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-semibold border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.navPractice} onChange={e => setSiteSettings({ ...siteSettings, navPractice: e.target.value })} required
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Page Subtabs & Headers */}
                <div className="space-y-4 pt-4">
                  <h4 className="text-md font-bold text-tertiary-container border-b border-outline-variant/20 pb-2">2. გვერდების ქვეთავები & სათაურები (Page Subtabs & Header Texts)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">აკადემიური ტაბი: კურსები</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-semibold border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.academicCoursesTab} onChange={e => setSiteSettings({ ...siteSettings, academicCoursesTab: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">აკადემიური ტაბი: ბიბლიოთეკა</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-semibold border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.academicLibraryTab} onChange={e => setSiteSettings({ ...siteSettings, academicLibraryTab: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">აკადემიური ტაბი: ბლოგები</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-semibold border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.academicBlogsTab} onChange={e => setSiteSettings({ ...siteSettings, academicBlogsTab: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1 md:col-span-3">
                      <label className="text-xs font-bold text-primary block">აკადემიური პორტალის სათაური & აღწერა</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-bold border border-outline-variant/60 rounded-xl p-3 text-sm mb-2 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.academicTitle} onChange={e => setSiteSettings({ ...siteSettings, academicTitle: e.target.value })} required
                      />
                      <textarea
                        rows={2} className="w-full bg-white text-slate-900 font-medium border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.academicSubtitle} onChange={e => setSiteSettings({ ...siteSettings, academicSubtitle: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1 md:col-span-3">
                      <label className="text-xs font-bold text-primary block">ღონისძიებების გვერდის სათაური & აღწერა</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-bold border border-outline-variant/60 rounded-xl p-3 text-sm mb-2 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.eventsTitle} onChange={e => setSiteSettings({ ...siteSettings, eventsTitle: e.target.value })} required
                      />
                      <textarea
                        rows={2} className="w-full bg-white text-slate-900 font-medium border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.eventsSubtitle} onChange={e => setSiteSettings({ ...siteSettings, eventsSubtitle: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1 md:col-span-3">
                      <label className="text-xs font-bold text-primary block">მედიტაციის ოთახის სათაური & აღწერა</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-bold border border-outline-variant/60 rounded-xl p-3 text-sm mb-2 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.practiceTitle} onChange={e => setSiteSettings({ ...siteSettings, practiceTitle: e.target.value })} required
                      />
                      <textarea
                        rows={2} className="w-full bg-white text-slate-900 font-medium border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.practiceSubtitle} onChange={e => setSiteSettings({ ...siteSettings, practiceSubtitle: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1 md:col-span-3">
                      <label className="text-xs font-bold text-primary block">დამფუძნებლის გვერდის სათაური & აღწერა</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-bold border border-outline-variant/60 rounded-xl p-3 text-sm mb-2 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.founderTitle} onChange={e => setSiteSettings({ ...siteSettings, founderTitle: e.target.value })} required
                      />
                      <textarea
                        rows={2} className="w-full bg-white text-slate-900 font-medium border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.founderSubtitle} onChange={e => setSiteSettings({ ...siteSettings, founderSubtitle: e.target.value })} required
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Landing Page Hero & About Settings */}
                <div className="space-y-4 pt-4">
                  <h4 className="text-md font-bold text-tertiary-container border-b border-outline-variant/20 pb-2">3. მთავარი გვერდის ტექსტები (Landing Page Texts)</h4>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">Hero სათაური (Hero Title)</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-bold border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.heroTitle} onChange={e => setSiteSettings({ ...siteSettings, heroTitle: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">Hero ქვესათაური (Hero Subtitle)</label>
                      <textarea
                        rows={2} className="w-full bg-white text-slate-900 font-medium border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.heroSubtitle} onChange={e => setSiteSettings({ ...siteSettings, heroSubtitle: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">Hero ღილაკის ტექსტი (CTA Button Text)</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-bold border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.heroCtaButton} onChange={e => setSiteSettings({ ...siteSettings, heroCtaButton: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">ინსტიტუტის აღწერა / შესახებ (About Section Text)</label>
                      <textarea
                        rows={4} className="w-full bg-white text-slate-900 font-medium border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.aboutText} onChange={e => setSiteSettings({ ...siteSettings, aboutText: e.target.value })} required
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Footer Settings */}
                <div className="space-y-4 pt-4">
                  <h4 className="text-md font-bold text-tertiary-container border-b border-outline-variant/20 pb-2">4. ფუტერის ტექსტები & კონტაქტები (Footer & Contacts)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1 md:col-span-3">
                      <label className="text-xs font-bold text-primary block">Copyright ტექსტი</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-semibold border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.footerCopyright} onChange={e => setSiteSettings({ ...siteSettings, footerCopyright: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">საკონტაქტო Email</label>
                      <input
                        type="email" className="w-full bg-white text-slate-900 font-semibold border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.footerContactEmail} onChange={e => setSiteSettings({ ...siteSettings, footerContactEmail: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">საკონტაქტო ტელეფონი</label>
                      <input
                        type="text" className="w-full bg-white text-slate-900 font-semibold border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.footerContactPhone} onChange={e => setSiteSettings({ ...siteSettings, footerContactPhone: e.target.value })} required
                      />
                    </div>
                  </div>
                </div>

                {/* 5. About Us Sub-sections Content */}
                <div className="space-y-4 pt-4">
                  <h4 className="text-md font-bold text-tertiary-container border-b border-outline-variant/20 pb-2">5. "ჩვენ შესახებ" ჩამოსაშლელი სექციების შინაარსი (About Us Sub-sections Content)</h4>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">ინსტიტუტის ისტორია (Institute History Content)</label>
                      <textarea
                        rows={3} className="w-full bg-white text-slate-900 font-medium border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.historyText} onChange={e => setSiteSettings({ ...siteSettings, historyText: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">დამფუძნებლის ბიოგრაფია & ხედვა (Founder Biography & Vision)</label>
                      <textarea
                        rows={3} className="w-full bg-white text-slate-900 font-medium border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.founderBioText} onChange={e => setSiteSettings({ ...siteSettings, founderBioText: e.target.value })} required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary block">ტრენერები & აკადემიური გუნდი (Trainers & Faculty Team Content)</label>
                      <textarea
                        rows={3} className="w-full bg-white text-slate-900 font-medium border border-outline-variant/60 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400 shadow-sm"
                        value={siteSettings.trainersText} onChange={e => setSiteSettings({ ...siteSettings, trainersText: e.target.value })} required
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-6"
                >
                  <Save size={18} />
                  ყველა ცვლილების შენახვა (Save Site Content)
                </button>
              </form>
            </div>
          )}
          </>
          )}
        </div>

        {/* Footer */}
        <footer className="py-6 border-t border-outline-variant/35 flex justify-center items-center text-xs text-text-muted bg-surface-container-low w-full relative z-20">
          <span>© 2026 ფსიქოსინთეზის ქართული ინსტიტუტი. ყველა უფლება დაცულია.</span>
        </footer>
      </main>

      {/* Success Toast */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 transition-all duration-500 z-[100] ${
        showToast ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
      }`} id="toast">
        <span className="material-symbols-outlined">check_circle</span>
        <span className="font-label-md">{toastMessage}</span>
      </div>

      {/* Decorative Blur Background circles */}
      <div className="fixed top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="fixed bottom-0 left-64 -z-10 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-[80px] translate-y-1/2"></div>
    </div>
  );
};
export default AdminDashboard;
