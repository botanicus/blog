import React from 'react';

const YearsOfExperience = () => <span>{new Date().getFullYear() - 2008}</span>;

export default () => <div>
  <h2>Hi! My name is James.</h2>
  <p>
    Thank you for visiting my humble blog.
    I'm a web developer with main focus on <span className="hashtag">Ruby</span> (with or without <span className="hashtag">Rails</span>),{' '}
    <span className="hashtag">JavaScript</span> (these days mainly <span className="hashtag">React.js</span>) and <span className="hashtag">Docker</span>.
    This is what I've been doing for the past <YearsOfExperience /> years and what I genuinely enjoy doing.
  </p>

  <p>
    <em style={{backgroundColor: 'yellow'}}>I'm happy to help you with your project. I charge $60 per hour. Just shoot me an email on <a href="mailto:contracts@101ideas.cz">contracts@101ideas.cz</a> and let me know what are you working on!</em>
  </p>

  <h3>Why should you hire me?</h3>
  {/* OSS */}
  <p>
    In my <YearsOfExperience /> years of experience I worked for some big companies, quite a few medium-sized ones, but mostly I work for small start-ups.
  </p>

  <p>
    VMware experience
  </p>

  <p>
    During my time in VMware I did quite a lot of product evangelization and also abit of public speaking.
    As much as I enjoyed it at the time, I realized I'm not that good in these (with the exception of technical writing which I still really enjoy), so I stopped doing them.
  </p>

  Healthcare UK, US
  Mexico City Timezone

  <h3>How do I work?</h3>
  <p>
    Just as about any remotely working freelancer, my main work tools are Slack, e-mail and an <abbr title="Mainly Jira, sometimes GitHub or GitLab issues, Pivotal Tracker, Trello and whatnot.">issue tracker</abbr>.
  </p>

  <p>
    While I'm happy to attend meetings of any sort where my expertise is required, I don't do daily stand-ups.
    I don't enjoy them and I don't like too many fixed points in my schedule. I'll get the job done on time,
    but I want to choose my hours.
  </p>
</div>
