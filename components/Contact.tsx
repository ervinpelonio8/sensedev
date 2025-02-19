import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const Contact = () => {
  return (
    <section className="bg-secondary-foreground py-16 px-8" id="contact">
      <Card className="max-w-4xl mx-auto border-none bg-transparent">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-heading font-semibold text-primary">
            Let&apos;s Connect!
          </CardTitle>
          <CardDescription className="text-lg text-primary">
            Have questions or need a custom solution? Reach out to us.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 gap-6 max-w-xl mx-auto">
            <div className="space-y-2">
              <Label htmlFor="name">What is your name?</Label>
              <Input
                id="name"
                type="text"
                placeholder="Full Name"
                required
                className="placeholder:text-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">What is your email address?</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                className="placeholder:text-muted"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">
                What is your Company&apos;s name? (Optional)
              </Label>
              <Input
                id="company"
                type="text"
                placeholder="Company Name"
                className="placeholder:text-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="services">What are you looking for?</Label>
              <Textarea
                id="services"
                placeholder="How can we help you?"
                className="placeholder:text-muted min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="leadSource">How did you hear about us?</Label>
              <Select name="leadSource" required>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google Search</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">
                Feel free to share any additional details. (Optional)
              </Label>
              <Textarea
                id="message"
                placeholder="Message or project description"
                className="placeholder:text-muted min-h-[100px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading"
            >
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default Contact;
