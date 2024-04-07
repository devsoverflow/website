---
title: Ansible reusable tasks in playbooks
publishDate: 2024-04-06
updatedDate: 2024-04-07
author: Jonathan Dyallo
description: "A playbook is a collection of tasks that can be executed on a host or a group of hosts. In this article, we will see how to create a playbook with reusable tasks."
image:
    url: "https://www.arsys.es/blog/file/uploads/2020/12/featured-ansible.jpg"
    alt: "ansible"
tags: ["ansible", "automation", "playbook", "tasks", "roles"]
language: 'en'
links:
  repository: 'https:example.com'
  website: 'https:example.com'
---

## Explication

To run the playbook we should call the `docker.yml` with a valid inventory for example `ansible-playbook ansible/suite/docker.yml -i ansible/inventory/debian.ini`

This command will execute the desired playbook which is going to execute the tasks from `debian-update` `install` `docker-group`

```
🌳 ansible-playbooks/
┣ 📁 ansible/
┃ ┣ 📁 inventory/
┃ ┃ ┗ 📄 debian.ini
┃ ┣ 📁 playbooks/
┃ ┃ ┗ 📄 update-and-install.yml
┃ ┣ 📁 roles/
┃ ┃ ┣ 📁 docker/
┃ ┃ ┃ ┗ 📁 tasks/
┃ ┃ ┃   ┣ 📄 docker-group.yml
┃ ┃ ┃   ┗ 📄 install.yml
┃ ┃ ┗ 📁 system/
┃ ┃   ┗ 📁 tasks/
┃ ┃ ┃   ┗📄 debian-update.yml
┃ ┗ 📁 suite/
┃   ┗ 📄 docker.yml
```

### debian-update.yml

```yaml
- name: Run apt-get update
  become: yes
  apt: update_cache=yes

- name: Run autoclean
  become: yes
  apt: autoclean=yes
  
- name: Run autoremove
  become: yes
  apt: autoremove=yes
  ```

### docker-group.yml

```yaml
- name: add docker group
  group:
    name: docker
    state: present

- name: add ubuntu to docker group
  become: yes
  user:
    name: "{{ ansible_user }}"
    groups: docker
    append: yes
```

### docker.yml

```yaml
---
- name: Update system and install docker
  hosts: debian

- name: Include update and install playbook
  ansible.builtin.import_playbook: ../playbooks/update-and-install.yml
```

### install.yml

```yaml
- name: Add Docker's official GPG key
  shell: |
    sudo apt-get update
    sudo apt-get install ca-certificates curl gnupg
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/{{ ansible_distribution | lower }}/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg

- name: Add the repository to Apt sources
  shell: |
    echo \
      "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/{{ ansible_distribution | lower }} \
      "$(. /etc/os-release && echo "{{ ansible_lsb.codename }}")" stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
      sudo apt-get update

- name: install packages
  become: yes
  apt:
    pkg:
      - docker-ce
      - docker-ce-cli
      - docker-buildx-plugin
      - docker-compose-plugin
    state: latest
    update_cache: yes

- name: service docker
  ansible.builtin.service:
    name: docker
    state: started
```

### update-and-install.yml

```yaml
---
- name: Update the system and install Docker, Docker Compose, and add the current user to the Docker group
  hosts: debian
  tasks:
    - name: Include prepare playbook
      ansible.builtin.include_tasks:
        file: ../roles/system/tasks/debian-update.yml
    
    - name: Include install playbook
      ansible.builtin.include_tasks:
        file: ../roles/docker/tasks/install.yml

    - name: Include add user to docker group playbook
      ansible.builtin.include_tasks:
        file: ../roles/docker/tasks/docker-group.yml
```
