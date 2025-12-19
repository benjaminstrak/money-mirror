// Personality definitions with 4-letter profile codes
// Format: [Money Avoidance, Money Worship, Money Status, Money Vigilance]
// H = High (10-15), L = Low (3-9)

export const personalities = {
  'LLLL': {
    name: 'The Bare Bones Boss',
    profile: 'LLLL',
    summary: 'You value simplicity and freedom from financial clutter. You prefer to keep life light and possessions minimal, rarely driven by material desires. Your challenge is making sure your minimalism doesn\'t become avoidance.',
    scriptReflections: {
      'Money Avoidance': 'You\'re deeply comfortable with living on less and often see financial restraint as a form of integrity. You don\'t believe money is inherently bad, but you do question its role in a meaningful life. At times, this belief might make you hesitant to grow your wealth, even when it could empower you.',
      'Money Worship': 'You rarely view money as a cure-all and don\'t chase it as a source of happiness. Instead, you rely on internal values to guide decisions, which keeps you grounded. Still, be mindful of dismissing the very real role money can play in creating options and safety.',
      'Money Status': 'You take pride in not measuring your worth by your income or possessions. Status symbols hold little appeal, and you resist the pressure to prove yourself financially. Just be aware that rejecting status entirely might close doors or create distance from others who do value it.',
      'Money Vigilance': 'You aren\'t overly focused on budgeting or tracking, and prefer a looser sense of financial flow. While this keeps life feeling free, it may also mean you overlook opportunities to build a stronger foundation. Building gentle habits around planning could support your sense of ease without disrupting it.'
    }
  },
  'LLHL': {
    name: 'The Quiet Maven',
    profile: 'LLHL',
    summary: 'You carry a quiet ambition and often link money to achievement, even if you don\'t flaunt it. You value stability and subtle signs of success. Your growth lies in loosening the grip of comparison.',
    scriptReflections: {
      'Money Avoidance': 'You\'re not uncomfortable with money, but you may treat it more like a tool than a topic of reflection. You prefer to stay focused on goals rather than getting caught up in emotional narratives about wealth. However, exploring those deeper beliefs could unlock more clarity and ease in your financial decisions.',
      'Money Worship': 'You don\'t believe money will magically fix everything, but you do see it as an important means to achieving security and progress. You might occasionally overemphasize its role, especially when things feel uncertain. Try balancing drive with moments of stillness - not all growth is financial.',
      'Money Status': 'You care about being respected, and money sometimes feels like a quiet way to earn that respect. You\'re not showy, but recognition matters to you. Your challenge is making sure your inner compass leads more than your external benchmarks.',
      'Money Vigilance': 'You tend to be careful and thoughtful with your money. You likely have systems or mental checklists to keep things in order. Just make sure you\'re not over-indexing on control - sometimes, generosity (even toward yourself) is the breakthrough.'
    }
  },
  'LHLL': {
    name: 'Dollar Dandelion',
    profile: 'LHLL',
    summary: 'You\'re light, spontaneous, and driven by the pleasure of the moment - money is something you enjoy freely. Your generosity is contagious, but you may avoid long-term planning. The key is grounding your joy in a little more intention.',
    scriptReflections: {
      'Money Avoidance': 'You don\'t carry baggage around money, but you may avoid dealing with it directly. It\'s easier for you to focus on joy than on structure. Bringing a little more intentionality to your financial decisions can expand your freedom, not reduce it.',
      'Money Worship': 'You often believe money enhances your quality of life - and you use it to create beauty, joy, or ease. While this can be uplifting, it may cause you to overspend when you\'re emotional or craving escape. Grounding your desires in values can help you spend with both delight and direction.',
      'Money Status': 'You\'re not status-driven - in fact, you may rebel against appearances or prestige. You measure value in experiences, not in material wins. That said, don\'t dismiss structure or strategy just because they feel square.',
      'Money Vigilance': 'Long-term planning may feel restrictive, and you\'re more spontaneous than strategic. But having a light-touch system in place could help you protect your joy - especially when money gets tight. Think of saving as creating future freedom, not current limitation.'
    }
  },
  'LHHL': {
    name: 'The Luxe Chaser',
    profile: 'LHHL',
    summary: 'You believe money is a gateway to joy, beauty, and status. You\'re drawn to the finer things and use spending as a form of self-expression. While your taste is impeccable, your challenge is knowing when enough is truly enough.',
    scriptReflections: {
      'Money Avoidance': 'You don\'t shy away from money - if anything, you chase it as a source of beauty and comfort. But sometimes, you may avoid sitting with uncomfortable money truths (like debt or overspending). Turning toward your financial reality with the same love you give to aesthetics can be transformative.',
      'Money Worship': 'You see money as a key to unlocking your ideal lifestyle. You\'re deeply motivated to earn and spend in a way that reflects who you are. The trick is to recognize when desire is leading, and when peace might be found in restraint.',
      'Money Status': 'You enjoy being seen - and money can feel like a way to signal your success. There\'s power in owning your ambition, but be mindful not to conflate appearance with self-worth. True richness doesn\'t always wear a label.',
      'Money Vigilance': 'You don\'t naturally gravitate toward restraint - and budgets may feel like buzzkills. But designing elegant financial boundaries could actually protect your freedom to live beautifully. Try treating savings like a luxury habit.'
    }
  },
  'HLLL': {
    name: 'The Cosmic Escapist',
    profile: 'HLLL',
    summary: 'You often feel distant from money - distrusting it, avoiding it, or wishing it didn\'t matter. You\'re drawn to meaning, art, or spirit, but you sometimes leave your finances in the shadows. Your growth lies in gently facing what you tend to float away from.',
    scriptReflections: {
      'Money Avoidance': 'You tend to see money as something that corrupts or complicates life. You may even feel guilt around having more than others. The journey here is recognizing that money, when aligned with values, can be a tool for good.',
      'Money Worship': 'You may not chase money, but you sometimes wish it would solve things magically so you wouldn\'t have to deal with it. There\'s a dreamer in you - and that\'s okay - but grounding in action can help you build a more empowered relationship with your resources.',
      'Money Status': 'You likely reject status-seeking and prefer to define your worth by internal qualities. But don\'t let that lead to financial invisibility - you deserve to be supported and seen. Claiming your needs isn\'t selling out.',
      'Money Vigilance': 'You may feel allergic to spreadsheets, goals, or tight control. But gentle rituals of checking in with your money can help you feel more rooted. Consider it spiritual hygiene - not financial tyranny.'
    }
  },
  'HLHL': {
    name: 'The Velvet Ascender',
    profile: 'HLHL',
    summary: 'You\'re ambitious, but always on your own terms. You\'re cautious, values-driven, and intentional about your financial growth. Your challenge is allowing yourself to enjoy the rewards of your climb.',
    scriptReflections: {
      'Money Avoidance': 'You sometimes hold back from seeking more money out of fear it might change who you are. But avoiding opportunity can also limit the good you could do. Explore how ambition and integrity can coexist.',
      'Money Worship': 'You don\'t worship wealth, but you do see it as a tool for advancement and security. You\'re driven, but not blindly so - just be careful not to confuse progress with peace.',
      'Money Status': 'You care about respect and being seen as accomplished, though you rarely shout it. Recognition feels earned, not flaunted. Make sure the path you\'re on reflects your true values, not just others\' impressions.',
      'Money Vigilance': 'You\'re naturally careful with money, and likely have systems that help you feel secure. While that caution serves you well, don\'t forget to enjoy what you\'re building as you go.'
    }
  },
  'HHLL': {
    name: 'Freedom Hunter',
    profile: 'HHLL',
    summary: 'You see money as your ticket to freedom - from limits, routines, or expectations. You\'re motivated, optimistic, and always imagining something better. Your growth lies in building stability without dimming your dream.',
    scriptReflections: {
      'Money Avoidance': 'You don\'t fear money, but you may ignore details that feel confining. Budgeting can feel like a cage. What if structure could actually fuel your escape plan?',
      'Money Worship': 'You may believe that more money will finally unlock the life you want. That might be true - but remember that agency begins before the bank balance changes.',
      'Money Status': 'You\'re less about flaunting and more about freedom. But a desire for recognition may still hide underneath. Define success on your own terms - not society\'s.',
      'Money Vigilance': 'Planning may not come naturally, but it can be your secret weapon. Freedom without foresight burns fast. Create safety that supports your boldness.'
    }
  },
  'HHHL': {
    name: 'The Gilded Player',
    profile: 'HHHL',
    summary: 'You\'re bold, magnetic, and success-driven - for you, money is both a reward and a performance. You\'re always chasing the next level and know how to make an impression. Your challenge is realizing that true confidence doesn\'t need the spotlight.',
    scriptReflections: {
      'Money Avoidance': 'You don\'t avoid money - you seek it out and shape it into something impressive. But beneath the performance, are there fears you\'re outrunning? Stillness can be clarifying.',
      'Money Worship': 'You may see money as proof you\'re winning - and sometimes feel empty without it. That hunger can drive you, but be careful not to lose yourself in the chase.',
      'Money Status': 'Status fuels your energy, and you know how to own a room. Just make sure your self-worth runs deeper than your aesthetic. Shine from the inside, not just the spotlight.',
      'Money Vigilance': 'You\'re strategic, but may take big swings financially. Build in safeguards that protect your ambitions. You don\'t need to gamble to feel bold.'
    }
  },
  'LLLH': {
    name: 'Zen Penny',
    profile: 'LLLH',
    summary: 'You\'re grounded in the essentials and content with little. You find peace in simplicity and are great at resisting financial pressure or consumerist noise. Your challenge is allowing yourself to spend with joy, not guilt.',
    scriptReflections: {
      'Money Avoidance': 'You don\'t fear money, but you may feel uncomfortable wanting more. You value peace over possessions, and that\'s a strength. Still, don\'t be afraid to desire - you\'re allowed to grow.',
      'Money Worship': 'You don\'t believe money will make you happy - and you may be skeptical of anyone who does. That clarity is grounding, but don\'t shut out what abundance can offer.',
      'Money Status': 'You\'re uninterested in status games, and rarely compare yourself to others. This helps you stay centered. Just remember: visibility isn\'t vanity - you don\'t have to disappear to stay humble.',
      'Money Vigilance': 'You\'re careful and often frugal - a natural at moderation. But saving out of fear can steal your joy. Try seeing spending as self-care, not self-sabotage.'
    }
  },
  'LLHH': {
    name: 'Grounded Tycoon',
    profile: 'LLHH',
    summary: 'You blend quiet confidence with practical ambition. You see money as a tool for independence, not indulgence. Your growth lies in celebrating your success without always needing to earn it first.',
    scriptReflections: {
      'Money Avoidance': 'You face money directly and rarely shy away from it - it\'s a tool, not a mystery. But you may downplay emotional patterns that shape how you earn or give. Pausing to reflect might reveal opportunities for deeper alignment.',
      'Money Worship': 'You don\'t expect miracles from money, but you do see it as a path to control and stability. That\'s realistic - just don\'t forget to value rest and joy alongside hustle.',
      'Money Status': 'You likely equate success with competence and responsibility - and it shows. But don\'t let financial achievement become the only story you tell about yourself.',
      'Money Vigilance': 'You\'re a steady planner who finds peace in knowing things are under control. This mindset serves you well - but you deserve spontaneity too. Let small, joyful risks in.'
    }
  },
  'LHLH': {
    name: 'The Money Monk',
    profile: 'LHLH',
    summary: 'You\'re disciplined, reflective, and find comfort in structure. You enjoy the calm that saving brings and often hold yourself to high financial standards. Your challenge is softening the inner voice that says "you can\'t."',
    scriptReflections: {
      'Money Avoidance': 'You don\'t avoid money - you study and manage it, sometimes with intense focus. But at times, your restraint may mask discomfort around indulgence. Consider where boundaries empower you, and where they may limit joy.',
      'Money Worship': 'You don\'t chase money for pleasure, but you respect its utility. You\'re more about peace than opulence. Just remember: a little comfort doesn\'t equal excess.',
      'Money Status': 'You rarely seek status, and may even judge those who do. Still, take care not to equate humility with invisibility. You\'re allowed to be recognized, even if you don\'t crave it.',
      'Money Vigilance': 'Your discipline is your superpower - you\'re cautious, structured, and often ahead of the curve. Just be mindful of rigidity. You\'re not failing if you break your own rules now and then.'
    }
  },
  'LHHH': {
    name: 'Gold Sentinel',
    profile: 'LHHH',
    summary: 'You see wealth as a shield - a way to feel safe, powerful, and prepared. You\'re ambitious but cautious, always scanning the horizon. Your journey is about finding peace in the present, not just preparing for the worst.',
    scriptReflections: {
      'Money Avoidance': 'You don\'t avoid money - you manage it with purpose. But emotional distance may show up when discussing vulnerability or need. Opening up could deepen your sense of security.',
      'Money Worship': 'You may sometimes rely on money as your anchor in chaos. While it does offer stability, remember that human connection and flexibility can be stabilizing too.',
      'Money Status': 'You want to be respected and may associate wealth with strength. That\'s not wrong - just make sure you\'re also cultivating self-worth that exists outside of achievement.',
      'Money Vigilance': 'You are exceptionally prepared and rarely caught off-guard financially. This vigilance helps you thrive - but don\'t forget to be here now. The future doesn\'t need all of your energy.'
    }
  },
  'HLLH': {
    name: 'The Wealth Skeptic',
    profile: 'HLLH',
    summary: 'You approach money with suspicion, believing it often causes more problems than it solves. You resist equating wealth with success and are deeply guided by your values. Your challenge is embracing the idea that money can be a force for good.',
    scriptReflections: {
      'Money Avoidance': 'You\'re wary of money\'s power and its potential to distort. But by pushing it away, you might also push away tools for empowerment. You can redefine money on your terms.',
      'Money Worship': 'You see the cracks in the fantasy of wealth and reject the illusion that money fixes all. But don\'t ignore how financial resources can ease burdens and open doors.',
      'Money Status': 'You actively resist status-seeking and may distrust those who flaunt wealth. Still, holding rigid views may isolate you from nuanced conversations about value and recognition.',
      'Money Vigilance': 'You likely save and spend cautiously, but with skepticism rather than excitement. Your caution is wise - but don\'t let it become your only mode. Optimism is a risk too, and sometimes worth taking.'
    }
  },
  'HLHH': {
    name: 'The Slow Flame',
    profile: 'HLHH',
    summary: 'You carry quiet ambition but move at your own pace. You\'re deeply thoughtful about money and reluctant to chase it blindly. Your path forward is trusting your timing - not everyone\'s race is a sprint.',
    scriptReflections: {
      'Money Avoidance': 'You don\'t dislike money, but you may put off facing it head-on. It\'s not avoidance, exactly - more like delay. Trust that your pace is valid, but don\'t use it to avoid clarity.',
      'Money Worship': 'You\'re skeptical that money solves everything, but still feel its pull. You want enough to breathe, not to flex. Stay anchored in sufficiency - not scarcity.',
      'Money Status': 'You may admire success but not crave the spotlight. Your values lie deeper. Still, don\'t deny yourself recognition - it can honor your effort without defining your worth.',
      'Money Vigilance': 'You\'re steady, cautious, and slow to act financially. This can be a strength, but don\'t let perfectionism block momentum. You don\'t need to have it all figured out to begin.'
    }
  },
  'HHLH': {
    name: 'Rainy Day Rebel',
    profile: 'HHLH',
    summary: 'You love the feeling of security and independence that comes with saving. You\'re cautious but not joyless - more of a strategic rebel than a tightwad. Your challenge is trusting yourself to enjoy what you\'ve earned.',
    scriptReflections: {
      'Money Avoidance': 'You don\'t avoid money - you manage it carefully, perhaps as a way to stay safe. Just be sure that control isn\'t covering up deeper anxieties. You can trust yourself to spend and still stay secure.',
      'Money Worship': 'You don\'t romanticize money, but you respect its power to protect. Sometimes, you may hold onto it too tightly out of fear of instability. Let your goals guide you - not just your worries.',
      'Money Status': 'You\'re not driven by appearances, though you enjoy having options that make you feel competent and strong. Status isn\'t the goal - independence is. Still, letting yourself be seen can be part of the journey too.',
      'Money Vigilance': 'You\'re highly alert when it comes to finances, with strong habits around saving and planning. Just make sure vigilance doesn\'t slip into rigidity. A little pleasure won\'t undo your progress.'
    }
  },
  'HHHH': {
    name: 'Cautious Crown',
    profile: 'HHHH',
    summary: 'You\'re highly driven and status-aware, but always with a plan. You don\'t just want success - you want to protect it. Your path forward involves learning to separate your self-worth from your wealth.',
    scriptReflections: {
      'Money Avoidance': 'You face money head-on, and rarely look away from your responsibilities. But emotional distance may still creep in. Try to find not just control, but connection.',
      'Money Worship': 'You respect what money can do, and may rely on it for confidence or protection. Just remember - the most valuable things don\'t always have price tags.',
      'Money Status': 'You want to be respected, admired, and seen as accomplished - and money often plays a role in that. That\'s okay, but be sure you\'re not tying your self-worth too tightly to your bank balance.',
      'Money Vigilance': 'You\'re a planner, a preparer, and possibly a perfectionist when it comes to finances. That drive keeps you stable - but sometimes the best flex is learning to let go.'
    }
  }
};

// Get personality by 4-letter profile code
export const getPersonalityByProfile = (profile) => {
  return personalities[profile] || null;
};

// Get all personality names
export const getAllPersonalityNames = () => {
  return Object.values(personalities).map(p => p.name);
};

