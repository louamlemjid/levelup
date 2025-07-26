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
      className="bg-gradient-to-t from-blue-200/30 to-background border-t border-border/50 text-foreground"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h3 className="text-3xl font-bold mb-4">
              Get in <span className="text-blue-400">Touch</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Have a project in mind or a question? Let&apos;s build something amazing together.
            </p>
            <div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-green-600" />
              <span className="text-muted-foreground">
                +216 50 144 403
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-sky-600" />
              <span className="text-muted-foreground">
                louam.lemjid@ensi-uma.tn
              </span>
            </div>
          </div>
          </div>
          
          

          {/* Club Info & Contact */}
          <div className="flex flex-col gap-8">
            

            <div className="flex flex-col gap-6 md:flex-row md:gap-12">
              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold mb-2">Contact</h4>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <span className="text-muted-foreground">
                    kelibia, Tunisia
                  </span>
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

            
          </div>
        </div>
 
        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © 2024 RobotX Club. All rights reserved. 
          
        </div>

      </div>
    </footer>
  );
}
