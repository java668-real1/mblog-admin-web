<template>
  <div class="app-container">
    <div class="app-container">
      <el-form :inline="true">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            placeholder="请输入角色名称"
            clearable
            size="mini"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="权限字符" prop="roleKey">
          <el-input
            placeholder="请输入权限字符"
            clearable
            size="mini"
            style="width: 240px"
          />
        </el-form-item>
<!--        <el-form-item label="状态" prop="status">-->
<!--          <el-select-->
<!--            placeholder="角色状态"-->
<!--            clearable-->
<!--            size="mini"-->
<!--            style="width: 240px"-->
<!--          >-->
<!--            <el-option-->
<!--              v-for="dict in roleType"-->
<!--              :key="dict.value"-->
<!--              :label="dict.label"-->
<!--              :value="dict.value"-->
<!--            />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="创建时间">
          <el-date-picker
            size="mini"
            style="width: 240px"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
          >搜索</el-button
          >
          <el-button icon="el-icon-refresh" size="mini"
          >重置</el-button
          >
        </el-form-item>
      </el-form>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
          >新增</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            plain
            icon="el-icon-edit"
            size="mini"
          >修改</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="mini"
          >删除</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
          >导出</el-button
          >
        </el-col>
      </el-row>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;margin-top: 10px"
      >
        <el-table-column :label="tempDesc.name" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="tempDesc.age" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.age }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="tempDesc.email" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="tempDesc.version" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.version }}</span>
          </template>
        </el-table-column>


        <!--      <el-table-column v-if="checkBtnPermission(['accountList:edit','accountList:delete','accountList:generateQR'])" :label="$t('table.actions')" align="center" width="310" class-name="small-padding fixed-width">-->
        <el-table-column label="操作" align="center" width="310" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button v-has="'accountList:edit'" type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)">
              edit
            </el-button>
            <el-button v-has="'accountList:delete'" type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)">
              delete
            </el-button>
            <!--          <el-button v-has="'accountList:generateQR'" type="primary" size="mini" style="width: 130px;margin-left: 10px" icon="el-icon-printer" @click="generateQRUrl(scope.row)">-->
            <!--            生成二维码图片-->
            <!--          </el-button>-->
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>


    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="120px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="tempDesc.name" prop="name">
          <el-input v-model="temp.name" :placeholder="'请输入' + tempDesc.name" />
        </el-form-item>
        <el-form-item :label="tempDesc.account" prop="account">
          <el-input v-model="temp.account" :placeholder="'请输入' + tempDesc.account" />
        </el-form-item>
        <el-form-item :label="tempDesc.appid" prop="appid">
          <el-input v-model="temp.appid" :placeholder="'请输入' + tempDesc.appid" />
        </el-form-item>
        <el-form-item :label="tempDesc.appsecret" prop="appsecret">
          <el-input v-model="temp.appsecret" :placeholder="'请输入' + tempDesc.appsecret" />
        </el-form-item>
        <el-form-item :label="tempDesc.token" prop="token">
          <el-input v-model="temp.token" :placeholder="'请输入' + tempDesc.token" />
        </el-form-item>
        <el-form-item :label="tempDesc.url" prop="url">
          <el-input v-model="temp.url" :placeholder="'请输入' + tempDesc.url" />
          <span style="font-size: 14px;color: #8492a6">http://{域名}/api/wx/portal/{appid}</span>
        </el-form-item>
        <el-form-item :label="tempDesc.aeskey" prop="aeskey">
          <el-input v-model="temp.aeskey" :placeholder="'请输入' + tempDesc.aeskey" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible = false">
          cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { checkBtnPermission } from '@/utils/permission' // 权限判断函数
import { fetchList } from '@/api/test/test'
// import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

// 常量title
const tempDesc = {
  'id': '',
  'name': '姓名',
  'age': '年龄',
  'email': '邮箱',
  'version': '版本号'
}
export default {
  // name: 'ComplexTable',
  components: { Pagination },
  // directives: { waves },
  filters: {},
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        name: ''
      },
      showReviewer: false,
      temp: {
        'id': '',
        'name': '',
        'account': '',
        'appid': '',
        'appsecret': '',
        'url': '',
        'token': '',
        'aeskey': '',
        'qrUrl': ''
      },
      tempDesc: tempDesc,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '增加'
      },
      rules: {
        name: [{ required: true, message: '请输入' + tempDesc.name, trigger: 'blur' }],
        account: [{ required: true, message: '请输入' + tempDesc.account, trigger: 'blur' }],
        appid: [{ required: true, message: '请输入' + tempDesc.appid, trigger: 'blur' }],
        appsecret: [{ required: true, message: '请输入' + tempDesc.appsecret, trigger: 'blur' }],
        url: [{ required: true, message: '请输入' + tempDesc.url, trigger: 'blur' }],
        token: [{ required: true, message: '请输入' + tempDesc.token, trigger: 'blur' }],
        aeskey: [{ required: true, message: '请输入' + tempDesc.aeskey, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // checkBtnPermission,
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        'id': '',
        'name': '',
        'account': '',
        'appid': '',
        'appsecret': '',
        'url': '',
        'baseAPI': '',
        'token': '',
        'aeskey': ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createRow(this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateRow(tempData).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var params = { 'id': row.id }
          deleteRow(params).then(() => {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        })
    },
    generateQRUrl(row) {
      this.$confirm('确定生成二维码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const tempData = Object.assign({}, row)
        generateQRUrl(tempData).then(() => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '生成二维码成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    }
  }

}
</script>
