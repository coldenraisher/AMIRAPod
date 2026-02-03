export interface Episode {
  id: string;
  title: string;
  date: string;
  duration: string;
  season: number;
  episode: number;
  image: string;
  excerpt: string;
  audioUrl: string;
  link: string;
}

export const mockEpisodes: Episode[] = [
  {
    id: "ep-10",
    title: "Understanding Roth IRAs vs Traditional IRAs",
    date: "2023-10-25T14:00:00Z",
    duration: "45:20",
    season: 2,
    episode: 10,
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop",
    excerpt: "The eternal question: Pay taxes now or later? We break down the fundamental differences between Roth and Traditional IRAs and help you decide which is best for your situation.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    link: "#"
  },
  {
    id: "ep-9",
    title: "Self-Directed IRAs: What You Can and Can't Invest In",
    date: "2023-10-18T14:00:00Z",
    duration: "38:15",
    season: 2,
    episode: 9,
    image: "https://images.unsplash.com/photo-1611974765270-ca12588265b6?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Want to invest your retirement funds in real estate, crypto, or private equity? A Self-Directed IRA might be for you. We explore the rules and prohibited transactions.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    link: "#"
  },
  {
    id: "ep-8",
    title: "The Backdoor Roth IRA Strategy Explained",
    date: "2023-10-11T14:00:00Z",
    duration: "32:10",
    season: 2,
    episode: 8,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Earn too much to contribute to a Roth IRA directly? The Backdoor Roth strategy is a legal loophole that might allow you to contribute anyway. Here's how it works.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    link: "#"
  },
  {
    id: "ep-7",
    title: "Required Minimum Distributions (RMDs) Made Simple",
    date: "2023-10-04T14:00:00Z",
    duration: "41:05",
    season: 2,
    episode: 7,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Once you reach a certain age, the IRS requires you to start taking money out of your retirement accounts. We discuss RMD calculations, deadlines, and strategies to minimize tax impact.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    link: "#"
  },
  {
    id: "ep-6",
    title: "IRA Contribution Limits for 2024",
    date: "2023-09-27T14:00:00Z",
    duration: "50:00",
    season: 2,
    episode: 6,
    image: "https://images.unsplash.com/photo-1621972777169-2f22285e6488?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Inflation has pushed contribution limits higher. We review the new caps for Traditional and Roth IRAs, as well as 401(k)s, and discuss how to maximize your tax-advantaged savings.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    link: "#"
  },
  {
    id: "ep-5",
    title: "Investing in Real Estate with your IRA",
    date: "2023-09-20T14:00:00Z",
    duration: "47:30",
    season: 1,
    episode: 5,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Real estate is a popular asset class for self-directed IRAs. Learn about purchasing rental properties, flips, and commercial real estate within your retirement portfolio.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    link: "#"
  }
];
