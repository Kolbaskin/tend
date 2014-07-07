<script src="/js/ko.validate.js"></script>
<script src="/js/registration.js"></script>
<tpl if="login">
    <script>
        delete viewModel.v.password
        delete viewModel.v.password_confirm
        
        API_URL = '/Gvsu.modules.users.controller.User.saveProfile/'
        
        viewModel.v.login('{login}')
        viewModel.v.email('{email}')
        viewModel.v.fname('{fname}')
        viewModel.v.name('{name}')
        viewModel.v.sname('{sname}')
        viewModel.v.phone('{phone}')
        viewModel.v.mobile('{mobile}')
        viewModel.v.position('{position}')
        viewModel.v.company('{company}')
    </script>
</tpl>