'use client';

import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Github,
  LayoutDashboard,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <footer
      ref={ref}
      className="bg-gradient-to-t from-yellow-200/30 to-background border-t border-border/50 text-foreground"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h3 className="text-3xl font-bold mb-4">
              Get in <span className="text-red-600">Touch</span>
            </h3>
            <p className="text-muted-foreground mb-8 max-w-lg">
              Ready to join RobotX? Have questions about our programs? We'd love
              to hear from you!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="focus:border-red-600"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="focus:border-red-600"
                />
              </div>
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                className="focus:border-red-600"
              />
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Club Info & Contact */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-3">RobotX Club</h3>
              <p className="text-muted-foreground max-w-md">
                Join our community of young innovators and help shape the future
                of robotics. From beginners to advanced programmers, we welcome
                everyone passionate about technology.
              </p>
            </div>

            <div className="flex flex-col gap-6 md:flex-row md:gap-12">
              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold mb-2">Contact</h4>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <span className="text-muted-foreground">
                    123 Innovation Drive, Tech City, TC 12345
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-red-600" />
                  <span className="text-muted-foreground">
                    +1 (555) 123-4567
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-red-600" />
                  <span className="text-muted-foreground">
                    hello@robotx.com
                  </span>
                </div>
              </div>

              {/* Club Hours */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold mb-2">Club Hours</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Mon - Fri</span>
                    <span>4:00 PM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <Button
                  variant="outlined"
                  size="sm"
                  className="border-border hover:bg-red-600 hover:text-white"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  className="border-border hover:bg-red-600 hover:text-white"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  className="border-border hover:bg-red-600 hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  className="border-border hover:bg-red-600 hover:text-white"
                >
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Administrateur</h4>
              <div className="flex gap-3">
                <Link href='/dashboard' className="flex flex-row  hover:underline">
                  <LayoutDashboard width={30} className='text-red-600'/>Dashboard
                </Link>
              </div>
            </div>
           
          </div>
        </div>
 
        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © 2024 RobotX Club. All rights reserved. 
          <div className="flex flex-col items-center space-y-2 mt-4">
            <p className="flex items-center">
              Créé avec 
              <span className="text-red-500 mx-1 text-base">❤️</span>
              par
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="flex flex-col items-center">
                <span className="font-medium text-foreground">Louam Lemjid</span>
                <span className="text-xs text-foreground/70">Software Developer </span>
                <div className="flex space-x-2 mt-1">
                  <Link 
                    href="https://www.linkedin.com/in/louam-lemjid-466435206/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    aria-label="LinkedIn Louam Lemjid"
                  >
                    LinkedIn
                  </Link>
                  <span className="text-slate-300">|</span>
                  <Link 
                    href="mailto:louam.lemjid@ensi-uma.tn" 
                    className="text-black hover:text-slate-800 transition-colors"
                    aria-label="Email Louam Lemjid"
                  >
                    Email
                  </Link>
                  <span className="text-slate-300">|</span>
                  <Link 
                    href="https://louam-lemjid.vercel.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800 transition-colors"
                    aria-label="Portfolio Louam Lemjid"
                  >
                    Portfolio
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium text-foreground">Rzouga</span>
                <span className="text-xs text-foreground/70">Graphic Designer</span>
                <div className="mt-1">
                  <div className="flex space-x-2">
                    <Link 
                      href="https://www.instagram.com/rzouga17?igsh=MThpZHpxNGhmaGYxbw==" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-800 transition-colors"
                      aria-label="Instagram Rzouga"
                    >
                      Instagram
                    </Link>
                    <span className="text-slate-300">|</span>
                    <Link 
                      href="https://portfolio-nu-eight-14.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 transition-colors"
                      aria-label="Portfolio Rzouga"
                    >
                      Portfolio
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
