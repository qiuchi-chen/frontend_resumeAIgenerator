// 初始化变量
let currentStep = 1;
let totalSteps = 4;
let skills = [];
let experienceCount = 1;
let educationCount = 1;

// DOM 元素
const startBtn = document.getElementById('startBtn');
const homeSection = document.getElementById('home');
const builderSection = document.getElementById('builder');
const previewSection = document.getElementById('preview');
const progressBar = document.getElementById('progressBar');
const resumePreview = document.getElementById('resumePreview');

// 步骤导航按钮
const nextToStep2 = document.getElementById('nextToStep2');
const backToStep1 = document.getElementById('backToStep1');
const nextToStep3 = document.getElementById('nextToStep3');
const backToStep2 = document.getElementById('backToStep2');
const nextToStep4 = document.getElementById('nextToStep4');
const backToStep3 = document.getElementById('backToStep3');
const generateResume = document.getElementById('generateResume');
const editResume = document.getElementById('editResume');
const downloadPDF = document.getElementById('downloadPDF');

// 表单元素
const addExperience = document.getElementById('addExperience');
const addEducation = document.getElementById('addEducation');
const experienceContainer = document.getElementById('experienceContainer');
const educationContainer = document.getElementById('educationContainer');
const skillInput = document.getElementById('skillInput');
const addSkill = document.getElementById('addSkill');
const skillsContainer = document.getElementById('skillsContainer');

// 初始化事件监听
function initEventListeners() {
  // 页面导航
  startBtn.addEventListener('click', () => {
    homeSection.classList.add('hidden');
    builderSection.classList.remove('hidden');
    updateProgressBar();
  });

  // 步骤导航
  nextToStep2.addEventListener('click', () => goToStep(2));
  backToStep1.addEventListener('click', () => goToStep(1));
  nextToStep3.addEventListener('click', () => goToStep(3));
  backToStep2.addEventListener('click', () => goToStep(2));
  nextToStep4.addEventListener('click', () => goToStep(4));
  backToStep3.addEventListener('click', () => goToStep(3));
  
  generateResume.addEventListener('click', generateResumeContent);
  editResume.addEventListener('click', () => {
    previewSection.classList.add('hidden');
    builderSection.classList.remove('hidden');
  });
  
  // 添加工作经验
  addExperience.addEventListener('click', () => {
    experienceCount++;
    addExperienceField(experienceCount);
  });
  
  // 添加教育经历
  addEducation.addEventListener('click', () => {
    educationCount++;
    addEducationField(educationCount);
  });
  
  // 添加技能
  addSkill.addEventListener('click', () => {
    const skill = skillInput.value.trim();
    if (skill && !skills.includes(skill)) {
      skills.push(skill);
      renderSkills();
      skillInput.value = '';
    }
  });
  
  // 按回车键添加技能
  skillInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addSkill.click();
    }
  });
  
  // 下载 PDF
  downloadPDF.addEventListener('click', downloadResumePDF);
}

// 切换步骤
function goToStep(step) {
  // 隐藏所有步骤
  document.querySelectorAll('.form-step').forEach(el => {
    el.classList.add('hidden');
  });
  
  // 显示当前步骤
  document.getElementById(`step${step}`).classList.remove('hidden');
  
  // 更新步骤指示器
  for (let i = 1; i <= totalSteps; i++) {
    const icon = document.getElementById(`step${i}Icon`);
    if (i < step) {
      icon.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white';
      icon.innerHTML = '<i class="fa fa-check"></i>';
    } else if (i === step) {
      icon.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary border-2 border-primary';
      icon.textContent = i;
    } else {
      icon.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-gray-500';
      icon.textContent = i;
    }
  }
  
  // 更新进度条
  currentStep = step;
  updateProgressBar();
}

// 更新进度条
function updateProgressBar() {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  progressBar.style.width = `${progress}%`;
}

// 添加工作经验字段
function addExperienceField(index) {
  const newExperience = document.createElement('div');
  newExperience.className = 'experience-item mb-6 border-b border-gray-100 pb-6';
  newExperience.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
      <div>
        <label for="company${index}" class="block text-sm font-medium text-gray-700 mb-1">公司名称</label>
        <input type="text" id="company${index}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
      </div>
      
      <div>
        <label for="position${index}" class="block text-sm font-medium text-gray-700 mb-1">职位</label>
        <input type="text" id="position${index}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
      </div>
      
      <div>
        <label for="startDate${index}" class="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
        <input type="month" id="startDate${index}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
      </div>
      
      <div>
        <label for="endDate${index}" class="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
        <input type="month" id="endDate${index}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
      </div>
    </div>
    
    <div>
      <label for="description${index}" class="block text-sm font-medium text-gray-700 mb-1">工作描述</label>
      <textarea id="description${index}" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"></textarea>
    </div>
    
    <button class="remove-experience text-red-500 hover:text-red-700 font-medium py-1 px-4 mt-2 flex items-center">
      <i class="fa fa-minus-circle mr-2"></i> 删除
    </button>
  `;
  
  experienceContainer.appendChild(newExperience);
  
  // 添加删除按钮事件
  newExperience.querySelector('.remove-experience').addEventListener('click', function() {
    newExperience.remove();
    experienceCount--;
  });
}

// 添加教育经历字段
function addEducationField(index) {
  const newEducation = document.createElement('div');
  newEducation.className = 'education-item mb-6 border-b border-gray-100 pb-6';
  newEducation.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
      <div>
        <label for="school${index}" class="block text-sm font-medium text-gray-700 mb-1">学校名称</label>
        <input type="text" id="school${index}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
      </div>
      
      <div>
        <label for="degree${index}" class="block text-sm font-medium text-gray-700 mb-1">学位</label>
        <input type="text" id="degree${index}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
      </div>
      
      <div>
        <label for="field${index}" class="block text-sm font-medium text-gray-700 mb-1">专业</label>
        <input type="text" id="field${index}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
      </div>
      
      <div>
        <label for="eduStartDate${index}" class="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
        <input type="month" id="eduStartDate${index}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
      </div>
      
      <div>
        <label for="eduEndDate${index}" class="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
        <input type="month" id="eduEndDate${index}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
      </div>
    </div>
    
    <button class="remove-education text-red-500 hover:text-red-700 font-medium py-1 px-4 mt-2 flex items-center">
      <i class="fa fa-minus-circle mr-2"></i> 删除
    </button>
  `;
  
  educationContainer.appendChild(newEducation);
  
  // 添加删除按钮事件
  newEducation.querySelector('.remove-education').addEventListener('click', function() {
    newEducation.remove();
    educationCount--;
  });
}

// 渲染技能标签
function renderSkills() {
  skillsContainer.innerHTML = '';
  skills.forEach(skill => {
    const skillTag = document.createElement('div');
    skillTag.className = 'skill-tag';
    skillTag.innerHTML = `
      ${skill}
      <span class="remove-skill" data-skill="${skill}">
        <i class="fa fa-times-circle"></i>
      </span>
    `;
    skillsContainer.appendChild(skillTag);
  });
  
  // 添加删除技能事件
  document.querySelectorAll('.remove-skill').forEach(el => {
    el.addEventListener('click', function() {
      const skillToRemove = this.getAttribute('data-skill');
      skills = skills.filter(skill => skill !== skillToRemove);
      renderSkills();
    });
  });
}

// 生成简历内容
function generateResumeContent() {
  // 收集表单数据
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const position = document.getElementById('position').value;
  const summary = document.getElementById('summary').value;
  
  // 收集工作经验
  const experiences = [];
  document.querySelectorAll('.experience-item').forEach((item, index) => {
    const company = item.querySelector(`#company${index + 1}`).value;
    const expPosition = item.querySelector(`#position${index + 1}`).value;
    const startDate = item.querySelector(`#startDate${index + 1}`).value;
    const endDate = item.querySelector(`#endDate${index + 1}`).value;
    const description = item.querySelector(`#description${index + 1}`).value;
    
    if (company && expPosition) {
      experiences.push({
        company,
        position: expPosition,
        startDate,
        endDate,
        description
      });
    }
  });
  
  // 收集教育经历
  const educations = [];
  document.querySelectorAll('.education-item').forEach((item, index) => {
    const school = item.querySelector(`#school${index + 1}`).value;
    const degree = item.querySelector(`#degree${index + 1}`).value;
    const field = item.querySelector(`#field${index + 1}`).value;
    const startDate = item.querySelector(`#eduStartDate${index + 1}`).value;
    const endDate = item.querySelector(`#eduEndDate${index + 1}`).value;
    
    if (school && degree) {
      educations.push({
        school,
        degree,
        field,
        startDate,
        endDate
      });
    }
  });
  
  // 生成简历HTML
  let resumeHTML = `
    <h1>${name}</h1>
    <p class="text-primary font-medium">${position}</p>
    
    <div class="contact-info">
      ${email ? `<div><i class="fa fa-envelope-o mr-1"></i> ${email}</div>` : ''}
      ${phone ? `<div><i class="fa fa-phone mr-1"></i> ${phone}</div>` : ''}
    </div>
    
    <h2>个人简介</h2>
    <p>${summary}</p>
  `;
  
  // 添加工作经验
  if (experiences.length > 0) {
    resumeHTML += `
      <h2>工作经验</h2>
      ${experiences.map(exp => `
        <div class="experience-item">
          <div class="flex justify-between">
            <h3>${exp.position}</h3>
            <span>${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}</span>
          </div>
          <p class="text-primary font-medium">${exp.company}</p>
          <p>${exp.description}</p>
        </div>
      `).join('')}
    `;
  }
  
  // 添加教育经历
  if (educations.length > 0) {
    resumeHTML += `
      <h2>教育背景</h2>
      ${educations.map(edu => `
        <div class="education-item">
          <div class="flex justify-between">
            <h3>${edu.degree}, ${edu.field}</h3>
            <span>${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span>
          </div>
          <p class="text-primary font-medium">${edu.school}</p>
        </div>
      `).join('')}
    `;
  }
  
  // 添加技能
  if (skills.length > 0) {
    resumeHTML += `
      <h2>技能</h2>
      <div class="skill-list">
        ${skills.map(skill => `
          <span class="skill-badge">${skill}</span>
        `).join('')}
      </div>
    `;
  }
  
  // 显示简历预览
  resumePreview.innerHTML = resumeHTML;
  builderSection.classList.add('hidden');
  previewSection.classList.remove('hidden');
}

// 格式化日期
function formatDate(dateString) {
  if (!dateString) return '至今';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });
}

// 下载简历为 PDF
function downloadResumePDF() {
  const element = document.getElementById('resumePreview');
  const opt = {
    margin: 10,
    filename: '我的简历.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  // 生成 PDF
  html2pdf().set(opt).from(element).save();
}

// 初始化应用
function initApp() {
  initEventListeners();
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);