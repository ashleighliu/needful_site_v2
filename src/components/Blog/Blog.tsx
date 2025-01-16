import { Link } from "react-router-dom";
import { Grid, Image, Title, Text, Box } from "@mantine/core";
import MeditatingWoman from "../../assets/MeditatingWoman.jpg";
import Blog1 from "../../assets/Blog1.png";
import classes from "./Blog.module.css";

export const blogEntries = [
  {
    id: 1,
    title: "The Needful Story: Why We Built an App for Mindful Productivity",
    excerpt:
      "How Needful transforms meditation by enabling users to capture and organize ideas during sessions, seamlessly blending mindfulness with productivity.",
    content: `Have you ever had a breakthrough idea during meditation, only to forget it minutes later when the session ends?  

Well, you're not alone.  

I’ve been there myself. One particular moment stands out: I was deep in a meditation session, feeling calm and focused, when a truly exciting idea struck me—a solution to a problem I’d been mulling over for weeks. It felt profound, almost like a gift from that rare mental clarity only meditation can bring.  

But as I debated whether to pause my session to jot it down, I hesitated, worried I’d be disrupting the practice.  

By the time I finished meditating, the idea had faded, and all I was left with was the frustration of knowing I’d lost something valuable.  

That experience isn’t just a personal frustration—it’s part of a centuries-old debate in meditation teachings: should you give preference to the meditation itself, staying in the moment no matter what arises, or should you honor the thought, pausing the practice to capture it before it slips away?  

That tension—between staying present in meditation and capturing the fleeting brilliance of an idea—was the inspiration behind Needful.  

We asked ourselves: Why should meditators have to choose between the two? What if there were a way to honor both the clarity of meditation and the practicality of acting on meaningful thoughts?  

That’s exactly what Needful does.  

---  

At its heart, Needful supports a self-guided, mantra-based meditation technique designed to blend mindfulness with actionable productivity.  

The cornerstone of this approach is the Needful meditation button, which transforms the meditation experience into something deeply interactive and grounded.  

Whether you're an experienced meditator or brand new to meditation, all you have to do is effortlessly "tap" the Needful meditation button. Your mantra will play faintly in the background, accompanied by gentle haptic feedback, anchoring you to the present while reinforcing the rhythm of your practice.  

Rather than setting aside an arbitrary amount of time needed for meditation, you can pre-set a specific number of mantras for your session. When that target is reached, the button delivers a longer haptic feedback—a subtle, calming reminder that it may be time to transition back to eyes-open action.  

As you're "tapping" through your mantras, you create the perfect conditions to quiet the mind and increase awareness. The quality of thought that tends to arise can lend itself to genuine insight and ideation that may not arise spontaneously, and certainly not on demand!  

---  

But here is where Needful is truly unique and revolutionary:  

When a thought or idea arises that may be useful to you, simply press-and-hold the Needful meditation button and easily record it into the app. While you seamlessly return to your meditation, we use powerful AI in the background to accurately transcribe, label, and categorize your thought for convenient retrieval later.  

---  

Needful isn’t just a tool—it’s a game-changer for how you approach both mindfulness and productivity.

Personal Growth:

By capturing your insights seamlessly, Needful allows you to turn moments of clarity into actionable steps. Whether it’s a creative idea, a personal breakthrough, or a long-sought solution, Needful empowers you to integrate these moments into your daily life.  

Meditation is no longer just about calming your mind—it becomes a catalyst for meaningful change.  

Professional Productivity:

Unlike traditional meditation practices that encourage stepping away from work, Needful is designed to seamlessly integrate into your workday.  

It provides a structured, repeatable way to surface prioritized to-do’s or insights, whether for yourself or your team.  

Imagine starting your day with a quick Needful session, using the mantra-based technique to quiet your mind and gain clarity. As you tap the Needful meditation button, your thoughts naturally organize themselves. When a key task or idea surfaces—something you know needs your attention—you can record it with ease and share it with your team.  

The insights you capture can fuel your next big project, solve complex challenges, or even spark collaboration. By offering an easy way to record and share thoughts, Needful transforms individual clarity into collective innovation.  

Peace of Mind:

Most importantly, Needful removes the tension between staying present and acting on an idea. With the confidence that your insights are safely captured, you can meditate fully, free from the worry of forgetting something valuable.  

---  

What makes Needful different? It’s designed to meet meditators and professionals where they are, providing a seamless blend of mindfulness and action.  

While traditional meditation apps focus solely on relaxation or guided sessions, Needful takes a step further. By integrating AI-powered transcription and categorization, it ensures your insights don’t just sit idly—they become accessible, organized, and ready for action.  

---  

In the development of Needful, we spoke with meditators, productivity experts, and mindfulness advocates to understand what was missing in their tools. The answer was clear: a way to bridge the gap between quiet reflection and dynamic action.  

Early feedback has been overwhelmingly positive, with users calling it “a breakthrough in making meditation practical for modern life.”  

But don’t just take our word for it. The best way to understand the power of Needful is to experience it yourself.  

Whether you’re seeking clarity for personal growth, creative breakthroughs, or professional productivity, Needful is designed to help you find your flow. It’s simple, intuitive, and built to support the moments that matter most.  

---  

Needful is now available in beta on both Apple and Android. Sign-up here and discover the power of mindful productivity at your fingertips.  

At Needful, we believe that when individuals combine mindfulness with meaningful action, extraordinary things can happen.  

It’s about more than just remembering your ideas—it’s about creating a new way of living and working, where meditation doesn’t just calm your mind but unlocks your potential.  

We’re excited to help create a world where great ideas are deliberately cultivated and captured, where individuals and teams are empowered to take action with clarity and purpose.  

With Needful, you’re not just meditating—you’re building a future shaped by your best moments of insight.  

Try Needful today.`,
    image: Blog1,
  },
  {
    id: 2,
    title: "Meditation Meets Productivity",
    excerpt:
      "Discover how Needful blends meditation and productivity for individuals and teams.",
    content: `Needful is the only meditation app designed with productivity features for individuals and teams. The micro-meditation protocol provides all of the benefits of traditional meditation, while allowing users to easily incorporate it into existing workflows and routines.`,
    image: MeditatingWoman,
  },
  {
    id: 3,
    title: "Mindfulness in the Workplace",
    excerpt:
      "Explore how mindfulness can improve team collaboration and focus.",
    content: `Incorporating mindfulness into workplace routines can significantly improve collaboration, focus, and overall productivity. Learn practical ways to make mindfulness a daily practice at work.`,
    image: MeditatingWoman,
  },
  {
    id: 4,
    title: "The Science Behind Meditation",
    excerpt:
      "Learn about the scientific research supporting meditation’s benefits.",
    content: `Meditation has been extensively studied for its positive impact on mental and physical health. Discover the key findings and why meditation is a practice for everyone.`,
    image: MeditatingWoman,
  },
];

export function Blog() {
  return (
    <div className={classes.blogContainer}>
      <Title order={2} className={classes.sectionTitle}>
        Latest Mindfulness Articles
      </Title>
      <Grid gutter="xl">
        {blogEntries.map((entry) => (
          <Grid.Col key={entry.id} span={6}>
            <Link to={`/blog/${entry.id}`} className={classes.blogLink}>
              <Box className={classes.blogCard}>
                <Image
                  className={classes.blogImage}
                  src={entry.image}
                  alt={entry.title}
                />
                <Text className={classes.blogTitle}>{entry.title}</Text>
                <Text className={classes.blogExcerpt}>{entry.excerpt}</Text>
              </Box>
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
