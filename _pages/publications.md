---
layout: archive
title: "Research"
permalink: /publications/
author_profile: true
---

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

Here you can find information about the research projects I have assisted, and my personal research projects (mostly in development) in collaboration with some amazing researchers. 

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
