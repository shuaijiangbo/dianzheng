<template>
  <div id="match-manage">
    <!-- 顶部栏 -->
    
    <div class="toptoolbar">
      <lp-button size="medium" icon="iconicon-test" @click="addMatch">创建赛事</lp-button>
      <!-- <el-button size="medium" type="primary" icon="el-icon-plus" @click="addMatch">创建赛事</el-button> -->
    </div>
    <div class="search">
      <el-form @submit.native.prevent :inline="true" :model="formSearch" class="demo-form-inline">
        <v-distpicker @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
        <el-form-item label="赛事名称" style="marginLeft: 10px;" class="eventName">
          <el-input v-model="formSearch.eventName" placeholder="赛事名称"></el-input>
        </el-form-item>
        <el-form-item label="比赛时间" class="date">
          <el-date-picker
            v-model="formSearchTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="级别">
          <el-select v-model="formSearch.eventLevel" placeholder="赛事级别">
            <el-option label="不限" value=""></el-option>
            <el-option :label="eventLevel" :value="eventLevel" v-for="(eventLevel, index) in eventLevels" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formSearch.publishStatus" placeholder="状态">
            <el-option label="不限" value=""></el-option>
            <el-option label="已发布" value="2"></el-option>
            <el-option label="未发布" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="warning" icon="el-icon-refresh">重置</el-button> -->
          <lp-button style="width: 100px" size="medium" icon="iconsousuo5" @click="searchSubmit">搜索</lp-button>
          <!-- <el-button size="medium" type="primary" icon="el-icon-search" @click="searchSubmit">搜索</el-button> -->
        </el-form-item>
      </el-form>
    </div>

    <div class="tb-content">
      <el-table
        v-loading="matchsTableLoading"
        border
        :data="matchs"
        style="width: 100%">
        <el-table-column align="center" type="index" :index="1" label="序号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="eventName"
          label="赛事名称">
        </el-table-column>
        <!-- min-width="141" 129 155 155 115 118 108 315-->
        <el-table-column
          align="center"
          prop="parentEventId"
          label="总赛事">
          <template slot-scope="scope">
            <span>{{ scope.row.parentEventId ? totalMatchs[scope.row.parentEventId] : '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="signUpTimeStart"
          label="报名时间">
          <template slot-scope="scope">
            <span>{{ `${scope.row.signUpTimeStart.split(' ')[0] || '0000-00-00' }`}}</span>
            <p style="margin: 0">至</p>
            <span>{{ `${scope.row.signUpTimeEnd.split(' ')[0] || '0000-00-00' }`}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="matchTimeStart"
          label="比赛时间">
          <template slot-scope="scope">
            <spquill-editoran>{{ `${scope.row.matchTimeStart.split(' ')[0] || '0000-00-00' }`}}</spquill-editoran>
            <p style="margin: 0">至</p>
            <span>{{ `${scope.row.matchTimeEnd.split(' ')[0] || '0000-00-00' }`}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="province"
          label="地点">
          <template slot-scope="scope">
            <span>{{ `${scope.row.province || '省'} ${scope.row.city  || '市'} ${scope.row.district || '区'}`}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="publishStatus"
          label="状态">
          <template slot-scope="scope">
            <span :style="scope.row.publishStatus === '2' ? {color: 'green'} : {color: 'red'}">{{ scope.row.publishStatus === '1' ? '未发布' : scope.row.publishStatus === '2' ? '已发布' :  '暂停报名' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="enrollCount"
          label="报名数">
        </el-table-column>
        <el-table-column label="操作" width="415">
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            <lp-button size="mini" icon="iconfabu" @click="handleEnroll(scope.$index, scope.row)">{{ scope.row.publishStatus === '1' ? '发布赛事' : scope.row.publishStatus === '2' ? '暂停报名' :  '恢复报名' }}</lp-button>
            <lp-button size="mini" type="success" icon="iconbianji-copy" @click="handleEdit(scope.$index, scope.row)">编辑</lp-button>
            <lp-button size="mini" icon="iconziliaoguanli" @click="handleAttch(scope.$index, scope.row)">资料管理</lp-button>
            <lp-button size="mini" icon="iconiconzhengli-" @click="handleSupport(scope.$index, scope.row)">赞助商管理</lp-button>
            <lp-button size="mini" icon="iconsvg45-copy" @click="handleNotice(scope.$index, scope.row)">通知管理</lp-button>
            <lp-button size="mini" icon="iconbaomingguanli" @click="handleSignup(scope.$index, scope.row)">报名管理</lp-button>
            <lp-button size="mini" icon="iconyulan" @click="handleSee(scope.row)">赛事预览</lp-button>
            <lp-button size="mini" icon="iconchengjiguanli" @click="handleScore(scope.$index, scope.row)">发布成绩</lp-button>
            <lp-button size="mini" type="delete" icon="iconshanchu" @click="handleDelete(scope.$index, scope.row)">删除</lp-button>
            <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <!-- <el-button size="mini" type="primary" @click="handleEnroll(scope.$index, scope.row)">{{ scope.row.publishStatus === '1' ? '发布赛事' : scope.row.publishStatus === '2' ? '暂停报名' :  '恢复报名' }}</el-button> -->
            <!-- <el-button size="mini" type="primary" @click="handleSee(scope.row)">赛事预览</el-button> -->
            <!-- <el-button size="mini" type="primary" @click="handleSignup(scope.$index, scope.row)">报名管理</el-button> -->
            <!-- <el-button size="mini" type="primary" @click="handleAttch(scope.$index, scope.row)">资料管理</el-button> -->
            <!-- <el-button size="mini" type="primary" @click="handleSupport(scope.$index, scope.row)">赞助商管理</el-button> -->
            <!-- <el-button size="mini" type="primary" @click="handleNotice(scope.$index, scope.row)">通知管理</el-button> -->
            <!-- <el-button v-if="false" size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">发布成绩</el-button> -->
            <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">邮寄证书</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="bottomtoolbar">
        <el-pagination
          prev-text="上一页"
          next-text="下一页"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :page-sizes="[5,10,15]"
          :page-size="pageSize"
          :total="total"
          style="float:right;"
        ></el-pagination>
      </div>
    </div>
    
    <!-- 展示收款信息模态框 -->
    <el-dialog
      class="DialogVisible"
      @closed="gatheringDialogClosed"
      title="平台展示收款信息"
      :show-close="false"
      :visible.sync="gatheringDialogVisible"
      :close-on-click-modal="false"
      width="50%">
        <!-- 图片上传组件辅助-->
        <el-upload
          class="avatar-uploader"
          :action="serverUrl"
          name="file"
          :show-file-list="false"
          :on-success="uploadSuccessInfo"
          :on-error="uploadError"
          :before-upload="beforeUpload">
        </el-upload>
        <!--富文本编辑器组件-->
        <!--  v-model="basicInfoForm.chargesInfo" -->
        <el-row v-loading="quillUpdateImg">
          <quill-editor
            v-if="gatheringDialogVisible"
            :content="basicInfoForm.chargesInfo"
            ref="myQuillEditorInfo"
            :options="editorOptionInfo">
          </quill-editor>
        </el-row>
      <span slot="footer" class="dialog-footer">
        <lp-button size="medium" type="primary" @click="handleSave">保存</lp-button>
        <lp-button size="medium" @click="handleCancel">取 消</lp-button>
      </span>
    </el-dialog>

    <!-- 创建赛事的说明模态框 -->
    <el-dialog
      class="statementDialogVisible"
      title="创建赛事 > 创建说明"
      :visible.sync="statementDialogVisible"
      :close-on-click-modal="false"
      width="50%">
      <p style="marginTop: 0; fontWeight: 600">说明：</p>
      <p>1. 请仔细阅读<a href="http://119.84.121.211:23081/event-api/public/help.docx" style="color: #EF7E26; textDecoration: none">《操作手册》</a>。</p>
      <p>2. 有问题请关注微信公众号“热动体育圈”后咨询。咨询办法：关注微信公众号“热动体育圈”后，输入文字咨询。咨询时间：工作日 10:00 - 18:00。</p>
      <p>3. 在本平台“已发布”的赛事，创建者暂时无法删除。</p>
      <p>4. 赛事发布前请“仔细核对”准备发布的内容。</p>
      <span slot="footer" class="dialog-footer">
        <lp-button size="medium" type="primary" @click="startAdd">开始创建</lp-button>
        <!-- <el-button size="medium" type="primary" @click="startAdd">开始创建</el-button> -->
        <lp-button size="medium" @click="statementDialogVisible = false">取 消</lp-button>
        <!-- <el-button size="medium" @click="statementDialogVisible = false">取 消</el-button> -->
      </span>
    </el-dialog>

    <!-- 创建赛事的流程模态框 -->
    <el-dialog
      @closed="addDialogClosed"
      class="addDialogVisible"
      :title="`${isEdit ? '编辑赛事' : '创建赛事'} > ${steps[currentstep]}`"
      :visible.sync="addDialogVisible"
      :close-on-click-modal="false"
      width="1350px">
      <div class="steps-container">
        <match-steps :steps="steps" :active.sync="currentstep"></match-steps>
      </div>
      <div class="form">
        <!-- 1. 基本信息表单 -->
        <el-form class="basic-info-from" label-width="100px" :model="basicInfoForm" v-if="currentstep === 0">
          <el-form-item label="赛事名称" prop="eventName">
            <el-input v-model="basicInfoForm.eventName" style="width: 570px" placeholder="赛事名称"></el-input>
          </el-form-item>
          <el-form-item label="总赛事" class="full">
            <el-select v-model="basicInfoForm.parentEventId" placeholder="总赛事">
              <el-option label="无" :value="0"></el-option>
              <el-option v-for="(match, index) in totalMatchsNoPulish" :key="index" :label="match" :value="parseInt(index)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="赛事种类" class="type">
            <el-select v-model="basicInfoForm.eventType1" placeholder="赛事种类">
              <el-option v-for="(value, key) in eventTypes1" :key="value" :label="key" :value="key"></el-option>
            </el-select>
            <el-select style="marginLeft: 29px" v-model="basicInfoForm.eventType2" placeholder="赛事种类">
              <el-option v-for="(eventType2, index) in eventTypes2" :key="index" :label="eventType2" :value="eventType2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="赛事级别" class="type">
            <el-select v-model="basicInfoForm.eventLevel" placeholder="赛事级别">
              <el-option :label="eventLevel" :value="eventLevel" v-for="(eventLevel, index) in eventLevels" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报名时间" class="date">
            <el-date-picker
              v-model="basicInfoFormTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="比赛时间" class="date">
            <el-date-picker
              v-model="basicInfoFormMatchTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="比赛地点" class="type">
              <v-distpicker :province="basicInfoForm.province" :city="basicInfoForm.city" :area="basicInfoForm.district" @province="basicInfoOnChangeProvince" @city="basicInfoOnChangeCity" @area="basicInfoOnChangeArea" />
              <el-input v-model="basicInfoForm.address" style="marginLeft: 27px;" placeholder="详细地址"></el-input>
          </el-form-item>
          <el-form-item label="赛事主办方" class="type">
            <el-input v-model="basicInfoForm.sponsor" placeholder="主办方1,主办方2"></el-input>
          </el-form-item>
          <el-form-item label="赛事联系人" class="type">
            <el-input v-model="basicInfoForm.adminName" placeholder="赛事联系人"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" class="type">
            <el-input v-model="basicInfoForm.adminTel" placeholder="联系方式"></el-input>
            <el-input v-model="basicInfoForm.adminEmail" placeholder="邮箱" style="marginLeft: 27px"></el-input>
          </el-form-item>
          <el-form-item label="收费方式">
            <el-radio-group v-model="basicInfoForm.chargesType">
              <el-radio label="平台代收"></el-radio>
              <el-radio label="平台展示收款信息"></el-radio>
            </el-radio-group>
            <el-button @click="handleEditGathering" v-if="basicInfoForm.chargesType === '平台展示收款信息'" size="mini" style="width: auto;marginLeft: 50px">编辑收款信息</el-button>
          </el-form-item>
          <el-form-item label="赛事LOGO" class="logo-upload">
            <el-upload
              action=""
              class="avatar-uploader"
              accept="image/*"
              :show-file-list="false"
              :before-upload="beforeLogoUpload">
              <img v-if="basicInfoForm.eventLogo" :src="basicInfoForm.eventLogo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">推荐图片尺寸为193*240</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="赛事宣传图" class="propaganda-upload">
            <el-upload
              action=""
              class="avatar-uploader"
              accept="image/*"
              :show-file-list="false"
              :before-upload="beforePropagandaUpload">
              <img v-if="basicInfoForm.eventBgImg" :src="basicInfoForm.eventBgImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">推荐图片尺寸为1920*1080</div>
            </el-upload>
          </el-form-item>

          
        </el-form>

        <!-- 2. 组别信息表格 -->
        <el-table height="510" class="group-infos" v-else-if="currentstep === 1" border :data="groupInfos" style="width: 98%;marginLeft: 2%">
          <el-table-column align="center" type="index" :index="1" label="序号" width="49">
          </el-table-column>
          <el-table-column align="center" prop="groupName" label="组别" width="158">
            <template slot-scope="scope">
              <el-input :disabled="basicInfoForm.publishStatus === '2' && scope.row.id !== 0" v-model="scope.row.groupName" placeholder="组别名称"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="participatingType" label="参赛单元" width="140">
            <template slot-scope="scope">
              <el-radio-group :disabled="basicInfoForm.publishStatus === '2' && scope.row.id !== 0" v-model="scope.row.participatingType" style="display: flex">
                <el-radio v-for="(participatingType, index) in participatingTypes" :key="index" :label="participatingType" style="margin: 0 5px">{{ participatingType }}</el-radio>
              </el-radio-group> 
            </template>
          </el-table-column> 
          <el-table-column align="center" prop="cost" label="费用" width="220">
            <template slot-scope="scope">
              <el-input type="number" min="0" :disabled="basicInfoForm.publishStatus === '2' && scope.row.id !== 0" v-model="scope.row.cost" style="width: 52px" class="cost" placeholder="费用"></el-input>
              <el-select :disabled="basicInfoForm.publishStatus === '2' && scope.row.id !== 0" v-model="scope.row.chargingMode" class="costtype" placeholder="" style="width: 75px">
                <el-option :label="chargingMode" :value="chargingMode" v-for="(chargingMode, index) in chargingModes" :key="index"></el-option>
              </el-select>
              <el-radio-group :disabled="basicInfoForm.publishStatus === '2' && scope.row.id !== 0" v-model="scope.row.chargingMode" style="paddingLeft: 10px">
                <el-radio label="免费" value="0"></el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="supportRegistration" label="支持报名" width="152" class="supportRegistration">
            <template slot-scope="scope">
              <el-checkbox-group :disabled="basicInfoForm.publishStatus === '2' && scope.row.id !== 0" v-model="scope.row.supportRegistration" style="display: flex">
                <el-checkbox v-for="(supportRegistration, index) in supportRegistrations" :key="index" :label="supportRegistration" style="margin: 0 5px"></el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="isAudit" label="报名是否需要审核" width="140">
            <template slot-scope="scope">
              <el-select :disabled="basicInfoForm.publishStatus === '2' && scope.row.id !== 0" v-model="scope.row.isAudit" class="audit" placeholder="" style="width: 59px">
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="175">
            <template slot-scope="scope">
              <lp-button size="mini" icon="iconicon-test" @click="addGroup(scope.$index, scope.row)">添加组别</lp-button>
              <lp-button size="mini" @click="deleteEventGroup(scope.$index, scope.row.id)" type="delete" icon="iconshanchu">删除</lp-button>
              <lp-button size="mini" @click="upAnddown(groupInfos, scope.$index, 1)" :disabled="scope.$index === 0" icon="iconshangsheng">上升</lp-button>
              <lp-button size="mini" @click="upAnddown(groupInfos, scope.$index, 0)" :disabled="scope.$index === groupInfos.length - 1" type="danger" icon="iconxiajiang">下降</lp-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 3. 报名表 -->
        <template v-else-if="currentstep === 2">
          <div class="signup-wrapper">
            <div class="top">
              <lp-button size="medium" icon="iconicon-test" @click="addMessageGroups">新增信息组</lp-button>
            </div>
            <div class="signups">
              <div class="signup" v-for="(message, index) in messageGroup" :key="index">
                <div class="header">
                  <el-form :inline="true" :model="message" class="demo-form-inline">
                    <el-form-item>
                      <span>{{ `序号${index+1}`}}</span>
                    </el-form-item>
                    <el-form-item label="组名称">
                      <el-input :disabled="basicInfoForm.publishStatus === '2' && message.columnList[0].id !== 0" v-model="message.groupName" class="group-name"></el-input>
                    </el-form-item>
                    <el-form-item label="上限" class="upper-limit">
                      <el-input min="0" :disabled="basicInfoForm.publishStatus === '2' && message.columnList[0].id !== 0" type="number" v-model="message.upperLimit"></el-input>
                    </el-form-item>
                    <el-form-item label="下限" class="upper-limit">
                      <el-input min="0" :disabled="basicInfoForm.publishStatus === '2' && message.columnList[0].id !== 0" type="number" v-model="message.lowerLimit"></el-input>
                    </el-form-item>
                    <el-form-item label="是否为参赛主体">
                      <el-select :disabled="(basicInfoForm.publishStatus === '2' && message.columnList[0].id !== 0) || true" v-model="message.isParticipating" class="zhuti" placeholder="">
                        <el-option label="是" value="是"></el-option>
                        <el-option label="否" value="否"></el-option>
                      </el-select>
                    </el-form-item>                 
                  </el-form>
                  <div class="handle">
                    <lp-button size="mini" @click="upAnddown(messageGroup, index, 1)" :disabled="index === 0 || index === 1" icon="iconshangsheng">上升</lp-button>
                    <lp-button size="mini" @click="upAnddown(messageGroup, index, 0)" :disabled="index === messageGroup.length - 1 || index === 0" type="danger" icon="iconxiajiang">下降</lp-button>
                    <lp-button size="mini" :disabled="basicInfoForm.publishStatus === '2' && message.columnList[0].id !== 0" @click="deleteMessageGroup(index)" type="delete" icon="iconshanchu" style="width: 106px;">删除信息组</lp-button>
                  </div>
                  
                </div>

                <div class="tb">
                  <el-table border :data="message.columnList" style="width: 98%; margin: 10px 1%">
                    <el-table-column align="center" prop="columnName" label="字段名称" style="height: 30px" width="161">
                      <template slot-scope="scope">
                        <el-input :disabled="basicInfoForm.publishStatus === '2' && scope.row.id !== 0" v-model="scope.row.columnName" placeholder="字段名称"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="columnType" label="字段类型" width="140">
                      <template slot-scope="scope">
                        <el-select :disabled="basicInfoForm.publishStatus === '2' && scope.row.id !== 0" v-model="scope.row.columnType" placeholder="字段类型" style="width: 110px">
                          <el-option :label="columnType" :value="columnType" v-for="(columnType, index) in columnTypes" :key="index"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="typeIdentification" label="字段标识" width="140">
                      <template slot-scope="scope">
                        <el-select :disabled="basicInfoForm.publishStatus === '2' && scope.row.id !== 0" v-model="scope.row.typeIdentification" placeholder="字段标识" style="width: 108px">
                          <el-option :label="typeIdentification" :value="typeIdentification" v-for="(typeIdentification, index) in typeIdentifications" :key="index"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="content" label="可选内容" width="200">
                      <template slot-scope="scope">
                        <el-input placeholder="可选内容使用英文;分割" :disabled="basicInfoForm.publishStatus === '2' && scope.row.id !== 0" v-model="scope.row.content" style="width: 161px"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="isMandatory" label="是否必填" width="140">
                      <template slot-scope="scope">
                        <el-select :disabled="basicInfoForm.publishStatus === '2' && scope.row.id !== 0" v-model="scope.row.isMandatory" placeholder="" style="width: 68px">
                          <el-option label="是" value="是"></el-option>
                          <el-option label="否" value="否"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="200">
                      <template slot-scope="scope">
                        <lp-button size="mini" :disabled="basicInfoForm.publishStatus === '2' && scope.row.id !== 0" icon="iconicon-test" @click="addField(index, scope.$index, scope.row)">添加字段</lp-button>
                        <lp-button size="mini" @click="deleteField(index, scope.$index, scope.row.id)" :disabled="basicInfoForm.publishStatus === '2' || message.columnList.length === 1 && message.columnList[0].id === 0" type="delete" icon="iconshanchu">删除</lp-button>
                        <lp-button size="mini" @click="upAnddown(message.columnList, scope.$index, 1)" :disabled="scope.$index === 0" icon="iconshangsheng">上升</lp-button>
                        <lp-button size="mini" @click="upAnddown(message.columnList, scope.$index, 0)" :disabled="scope.$index === message.columnList.length - 1" type="danger" icon="iconxiajiang">下降</lp-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
            
          </div>
        </template>

        <!-- 4. 赛事规章 -->
        <div class="match-rules" v-else-if="currentstep === 3">
          <!-- 图片上传组件辅助-->
          <el-upload
            class="avatar-uploader"
            :action="serverUrl"
            name="file"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload">
          </el-upload>
          <!--富文本编辑器组件-->
          <el-row v-loading="quillUpdateImg" style="paddingLeft: 20px">
            <quill-editor v-model="matchRule.rules"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
              @change="onEditorChange($event)">
            </quill-editor>
          </el-row>
        </div>

        <!-- 5. 赛事资料 -->
        <div class="match-attch" v-else-if="currentstep === 4">
          <div class="top">
            <lp-button size="medium" icon="iconicon-test" @click="addMatchAttchs">添加资料</lp-button>
          </div>
          <div class="match-attch-tb">
            <el-table height="463" border :data="matchAttchs" style="width: 100%;">
              <el-table-column align="center" type="index" :index="1" label="序号" width="114">
              </el-table-column>
              <el-table-column align="center" prop="fileName" label="资料名" width="428">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.fileName" style="width: 339px"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <!--  -->
                  <el-upload
                    @click.native="matchAttchUploadClick(scope.$index)"
                    class="avatar-uploader"
                    :show-file-list="false"
                    name="file"
                    :action="attchsUploadUrl"
                    :data="{ id: scope.row.id, eventsId: basicInfoForm.id, fileName: scope.row.fileName }"
                    :on-success="onSuccess"
                    :on-error="onError"
                    :before-upload="attchsbeforeUpload">
                    <el-button size="mini" type="primary" icon="el-icon-upload2">上传资料</el-button>
                  </el-upload>
                  <el-button size="mini" :disabled="matchAttchs.length === 1 && matchAttchs[0].id === 0" @click="deleteMatchAttch(scope.$index, scope.row.id)" type="danger" icon="el-icon-delete">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <!-- 6. 赛事支持 -->
        <div class="match-support" v-else-if="currentstep === 5">
          <lp-button size="medium" icon="iconicon-test" @click="addMatchSupports">添加支持方</lp-button>
          <el-table  height="465" border :data="matchSupports" style="width: 100%;marginTop: 10px">
            <el-table-column align="center" type="index" :index="1" label="序号" width="80">
            </el-table-column>
            <el-table-column align="center" prop="type" label="类别" width="170">
              <template slot-scope="scope">
                <el-select v-model="scope.row.type" placeholder="支持方类别" style="width: 150px">
                  <el-option :label="type" :value="type" v-for="(type, index) in matchSupportType" :key="index"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="supportName" label="支持方名称" width="260">
              <template slot-scope="scope">
                <el-input v-model="scope.row.supportName" style="width: 198px" placeholder="支持方名称"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="logo" label="支持方LOGO" width="196">
              <template slot-scope="scope">
                <el-upload
                  class="avatar-uploader"
                  style="marginTop: 6px"
                  action=""
                  accept="image/*"
                  :show-file-list="false"
                  @click.native="supportLogoUploadClick(scope.$index)"
                  :before-upload="beforeSupportLogoUpload">
                  <img v-if="scope.row.fileUrl" :src="scope.row.fileUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <lp-button size="mini" @click="deleteMatchSupport(scope.$index, scope.row.id)" type="delete" icon="iconshanchu">删除</lp-button>
                <lp-button size="mini" @click="upAnddown(matchSupports, scope.$index, 1)" :disabled="scope.$index === 0" icon="iconshangsheng">上升</lp-button>
                <lp-button size="mini" @click="upAnddown(matchSupports, scope.$index, 0)" :disabled="scope.$index === matchSupports.length - 1"  type="delete" icon="iconxiajiang">下降</lp-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <lp-button size="medium" type="primary" @click="prevStep" :disabled="currentstep == 0">上一步</lp-button>
        <!-- <el-button size="medium" type="primary" @click="prevStep" :disabled="currentstep == 0">上一步</el-button> -->
        <lp-button size="medium" type="primary" :loading="nextLoading" @click="nextStep">{{ currentstep === 5 ? '完成' : '下一步' }}</lp-button>
        <!-- <el-button size="medium" :loading="nextLoading" type="primary" @click="nextStep">{{ currentstep === 5 ? '完成' : '下一步' }}</el-button> -->
        <lp-button size="medium" @click="addDialogVisible = false">取 消</lp-button>
      </span>
    </el-dialog>
    
    
  </div>
</template>

<script>
import { getEventPreview, enitStartEnroll, listDictionaryByPid, deleteEvent, publishEvent, findEvent, deleteEventSupports, listEventSupports, deleteEventInformation, listEventInformation, findEventRules, deleteEventColumn, listEventColumn, deleteEventGroup, getMatchsByPage, getListDicts, getTotalMatchs, addMatchBasicInfo, addEventGroup, addEventColumn, addEventRules, addEventInformation, addEventEventSupports, getListEventGroup } from '@/api/matchManage.js'
import { VueCropper }  from 'vue-cropper'
import VDistpicker from 'v-distpicker'
import matchSteps from './components/match-steps/index.vue'
import qs from 'qs'
import util from '@/common/util'

export default {
  data() {
    // 工具栏配置
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{'header': 1}, {'header': 2}],               // custom button values
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
      [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
      [{'direction': 'rtl'}],                         // text direction

      [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
      [{'header': [1, 2, 3, 4, 5, 6, false]}],

      [{'color': []}, {'background': []}],          // dropdown with defaults from theme
      [{'font': []}],
      [{'align': []}],
      ['link', 'image', 'video'],
      ['clean']                                         // remove formatting button
    ]
    return {
      // 6. 赛事支持
      matchSupports: [
        {
          id: 0,
          eventsId: '',
          type: '冠名赞助',
          supportName: '',
          sort: '',
          file: '',
          fileUrl: ''
        }
      ],
      currentSupportLogoIndex: '',
      // 5. 赛事资料
      matchAttchs: [
        {
          eventsId: '',
          id: 0,
          fileName: '',
          file: ''
        }
      ],
      attchsUploadUrl: `${process.env.VUE_APP_API}/event-api/management/addEventInformation`,
      currentMatchAttchIndex: '',
      // 4. 赛事规章
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      serverUrl: `${process.env.VUE_APP_API}/event-api/management/addFile`,  // 这里写你要上传的图片服务器地址
      matchRule: {
        eventId: '',
        rules: '<p>赛事规章内容</p>'
      },
      editorOption: {
        modules: {
          imageResize: {},
          // imageDrop:true,
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': function (value) {
                  if (value) {
                    console.log('自定义富文本编辑器的图片上传事件')
                    document.querySelector('.match-rules .avatar-uploader input').click()
                  } else {
                      this.quill.format('image', false);
                  }
              }
            }
          }
        }
      },
      editorOptionInfo: {
        modules: {
          imageResize: {},
          // imageDrop:true,
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': function (value) {
                  if (value) {
                    console.log('自定义富文本编辑器的图片上传事件')
                    document.querySelector('.DialogVisible .avatar-uploader input').click()
                  } else {
                      this.quill.format('image', false);
                  }
              }
            }
          }
        }
      },
      // 3. 报名表 信息组数据
      messageGroup: [
        {
          groupName: '',
          upperLimit: 1,
          lowerLimit: 1,
          isParticipating: '是',
          groupSort: '',
          columnList: [
            {
              id: 0,
              eventsId: '',
              columnName: '',
              columnType: '文本',
              content: '',
              isMandatory: '是',
              typeIdentification: '自定义',
              sort: ''
            }
          ]
        }
      ],
      // 2. 组别信息数据
      groupInfos: [
        {
          eventsId: '',
          id: 0,
          groupName: '',
          participatingType: '个人',
          cost: '',
          chargingMode: '/人',
          supportRegistration: [],
          isAudit: '是'
        }
      ],
      // 1. 基础信息表单
      basicInfoForm: {
        id: '',
        eventName: '',
        parentEventId: 0,
        eventType1: '',
        signUpTimeStart: '',
        signUpTimeEnd: '',
        matchTimeStart: '',
        matchTimeEnd: '',
        province: '',
        city: '',
        district: '',
        address: '',
        adminName: '',
        adminTel: '',
        adminEmail: '',
        chargesType: '平台代收',
        eventLogoFile: '',
        eventBgImgFile: '',
        eventLogo: '',
        eventBgImg: '',
        chargesInfo: '',
        sponsor: '', // 主办方
      },

      isEdit: false,
      propagandaUrl: '',
      logoUrl: '',
      previewUrl: '',
      matchsTableLoading: false,
      currentstep: 0,
      steps: ['基本信息', '组别信息', '报名表', '赛事规章', '赛事资料', '赛事支持'],
      eventLevels: [], // 赛事等级字典
      eventTypes1: {}, // 赛事种类大项
      eventTypes2: [], // 赛事种类小项
      participatingTypes: [], // 参数单元
      supportRegistrations: [], // 支持报名
      chargingModes: [], // 收费模式
      columnTypes: [], // 字段类型
      typeIdentifications: [], // 字段标识
      matchSupportType: [],
      totalMatchs: {}, // 总赛事
      totalMatchsNoPulish: {}, // 未发布的总赛事
      formSearch: {
        eventName: '',
        province: '',
        city: '',
        district: '',
        matchTimeStart: undefined,
        matchTimeEnd: undefined,
        eventLevel: '',
        publishStatus: ''
      },
      nextLoading: false,
      matchs: [],
      total: 0, // 分页总数
      pageNum: 1, // 页码
      pageSize: 10, // 一页数量
      statementDialogVisible: false,
      addDialogVisible: false,
      gatheringDialogVisible: false,
    }
  },
  methods: {
    // 6. 赛事支持
    addMatchSupports () {
      this.matchSupports.push({
        id: 0,
        eventsId: '',
        type: '冠名赞助',
        supportName: '',
        sort: '',
        file: '',
        fileUrl: ''
      })
    },
    supportLogoUploadClick (index) {
      this.currentSupportLogoIndex = index
    },
    beforeSupportLogoUpload (file) {
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isLt5M) {
        this.$message.error('上传LOGO图片大小不能超过 5MB!');
      } else {
        var windowURL = window.URL || window.webkitURL;
        this.$set(this.matchSupports, this.currentSupportLogoIndex, { ...this.matchSupports[this.currentSupportLogoIndex], fileUrl: windowURL.createObjectURL(file) })
        this.matchSupports[this.currentSupportLogoIndex].file = file
      }
      return false;
    },
    deleteMatchSupport(index, id) {
      if (this.matchSupports[index].id !== 0) {
        deleteEventSupports({ ids: id }).then(res => {
          this.matchSupports.splice(index, 1)
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.matchSupports.splice(index, 1)
      }
    },
    // 5. 赛事资料
    addMatchAttchs () {
      this.matchAttchs.push({
        eventsId: '',
        id: 0,
        fileName: '',
        file: ''
      })
    },
    matchAttchUploadClick (index) {
      this.currentMatchAttchIndex = index
    },
    onSuccess (response, file) {
      this.matchAttchs[this.currentMatchAttchIndex].id = response.data.id
      this.$message.success('资料上传成功')
    },
    onError (err, file) {
      this.$message.error('资料上传失败，请重试')
    },
    // 4. 删除资料
    deleteMatchAttch (index, id) {
      if (this.matchAttchs[index].id !== 0) {
        deleteEventInformation({ ids: id }).then(res => {
          this.matchAttchs.splice(index, 1)
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.matchAttchs.splice(index, 1)
      }
    },
    attchsbeforeUpload (file) {
      const isLt50M = file.size / 1024 / 1024 < 50
      const fileName = this.matchAttchs[this.currentMatchAttchIndex].fileName !== ''

      if (!isLt50M) {
        this.$message.error('上传文件大小不能超过 50MB!')
        return false
      }
      if (!fileName) {
        this.$message.error('请填写资料名称！')
        return false
      }
      // this.matchAttchs[this.currentMatchAttchIndex].file = file
    },
    // 4. 赛事规章
    onEditorBlur (quill) {
    },
    onEditorFocus (quill) {
    },
    onEditorReady (quill) {
    },
    onEditorChange ({ quill, html, text }) {
      this.matchRule.rules = html
    },
    // onEditorChangeInfo ({ quill, html, text }) {
    //   this.basicInfoForm.chargesInfo = html
    // },
    uploadSuccess (res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        let quill = this.$refs.myQuillEditor.quill
        // 如果上传成功
        if (res.status === 200 && res.data[0] !== null) {
            // 获取光标所在位置
            let length = quill.getSelection().index;
            // 插入图片  res.data.info为服务器返回的图片地址
            quill.insertEmbed(length, 'image', res.data[0])
            // 调整光标到最后
            quill.setSelection(length + 1)
        } else {
            this.$message.error('图片插入失败')
        }
        // loading动画消失
        this.quillUpdateImg = false
    },
    uploadSuccessInfo (res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        let quill = this.$refs.myQuillEditorInfo.quill
        // 如果上传成功
        if (res.status === 200 && res.data[0] !== null) {
            // 获取光标所在位置
            let length = quill.getSelection().index;
            // 插入图片  res.data.info为服务器返回的图片地址
            quill.insertEmbed(length, 'image', res.data[0])
            // 调整光标到最后
            quill.setSelection(length + 1)
        } else {
            this.$message.error('图片插入失败')
        }
        // loading动画消失
        this.quillUpdateImg = false
    },
    // 富文本图片上传失败
    uploadError() {
        // loading动画消失
        this.quillUpdateImg = false
        this.$message.error('图片插入失败')
    },
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true
    },
    // 3. 报名表信息组新增信息组
    addMessageGroups () {
      if (this.messageGroup.length === 0) {
        this.messageGroup.push({
          groupName: '',
          upperLimit: 1,
          lowerLimit: 1,
          isParticipating: '是',
          groupSort: '',
          columnList: [
            {
              id: 0,
              eventsId: '',
              columnName: '',
              columnType: '文本',
              content: '',
              isMandatory: '是',
              typeIdentification: '自定义',
              sort: ''
            }
          ]
        })
      } else {
        this.messageGroup.push({
          groupName: '',
          upperLimit: 1,
          lowerLimit: 1,
          isParticipating: '否',
          groupSort: '',
          columnList: [
            {
              id: 0,
              eventsId: '',
              columnName: '',
              columnType: '文本',
              content: '',
              isMandatory: '是',
              typeIdentification: '自定义',
              sort: ''
            }
          ]
        })
      }
      
    },
    // 3. 报名表信息组添加字段
    addField (index, indexx, row) {
      this.messageGroup[index].columnList.push({
        id: 0,
        eventsId: '',
        columnName: '',
        columnType: '文本',
        content: '',
        isMandatory: '是',
        typeIdentification: '自定义',
        sort: ''
      })
    },
    // 3. 报名表信息组删除字段
    deleteField (index, indexx, id) {
      if (this.messageGroup[index].columnList[indexx].id !== 0) {
        deleteEventColumn({ ids: id }).then(res => {
          this.messageGroup[index].columnList.splice(indexx, 1)
          // 删没了，就填了一个空的
          if (this.messageGroup[index].columnList.length === 0) {
            this.messageGroup[index].columnList.push({
              id: 0,
              eventsId: '',
              columnName: '',
              columnType: '文本',
              content: '',
              isMandatory: '是',
              typeIdentification: '自定义',
              sort: ''
            })
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.messageGroup[index].columnList.splice(indexx, 1)
        // 删没了，就填了一个空的
        if (this.messageGroup[index].columnList.length === 0) {
          this.messageGroup[index].columnList.push({
            id: 0,
            eventsId: '',
            columnName: '',
            columnType: '文本',
            content: '',
            isMandatory: '是',
            typeIdentification: '自定义',
            sort: ''
          })
        }
      }  
    },
    // 3. 删除信息组
    deleteMessageGroup (index) {
      let ids = []
      for (let column of this.messageGroup[index].columnList) {
        column.id ? ids.push(column.id) : ''
      }
      deleteEventColumn({ ids: ids.join(',') }).then(res => {
        this.messageGroup.splice(index, 1)
      }).catch(err => {
        console.log(err)
      })
    },
    addGroup () {
      this.groupInfos.push({
        eventsId: '',
        id: 0,
        groupName: '',
        participatingType: '个人',
        cost: '',
        chargingMode: '/人',
        supportRegistration: [],
        isAudit: '是'
      })
    },
    // 2. 删除赛事组别
    deleteEventGroup (index, id) {
      if (this.groupInfos[index].id !== 0) {
        deleteEventGroup({ ids: id }).then(res => {
          this.groupInfos.splice(index, 1)
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.groupInfos.splice(index, 1)
      }
    },
    // 1. 基本信息管理
    handleEditGathering () {
      this.gatheringDialogVisible = true
      this.$set(this.basicInfoForm, 'chargesInfo', this.basicInfoForm.chargesInfo)
    },
    handleSave () {
      this.basicInfoForm.chargesInfo = this.$refs.myQuillEditorInfo._content
      this.gatheringDialogVisible = false
    },
    handleCancel () {
      this.gatheringDialogVisible = false
    },
    gatheringDialogClosed () {

    },
    // 赛事管理表操作
    handleEdit (index, row) {
      findEvent({ eventId: row.id }).then(res => {
          this.basicInfoForm = res.data
          this.basicInfoForm.matchTimeStart === null ? this.basicInfoForm.matchTimeStart = '' : ''
          this.basicInfoForm.matchTimeEnd === null ? this.basicInfoForm.matchTimeEnd = '' : ''
          this.basicInfoForm.signUpTimeEnd === null ? this.basicInfoForm.signUpTimeEnd = '' : ''
          this.basicInfoForm.signUpTimeStart === null ? this.basicInfoForm.signUpTimeStart = '' : ''
          this.basicInfoForm.eventType2 === 'null' ? this.basicInfoForm.eventType2 = '' : ''
          this.basicInfoForm.eventLevel === 'null' ? this.basicInfoForm.eventLevel = '' : ''
          return getListDicts({ dictionaryName: '赛事种类大项' })
        }).then(res => {
          this.isEdit = true
          this.addDialogVisible = true
          for(let item of res.data) {
            this.eventTypes1[item.value] = item.id
          }
      }).catch(err => {
        console.log(err)
      })
    },
    handleSee (row) {
      window.open(this.previewUrl + '?id=' + row.id)
    },
    handleEnroll (index, row) {

      if (row.publishStatus === '1') { // 未发布
        this.$confirm('赛事发布后，将开放在公众端，是否确认发布?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          publishEvent({ eventId: row.id }).then(res => {
            this.matchs[index].publishStatus = '2'
          }).catch(err => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })       
        })
      } else { // 已发布
        enitStartEnroll({ eventId: row.id }).then(res => {
          this.getMatchsByPage()
        }).catch(err => {
          console.log(err)
        })
      }      
    },
    handlePublish (index, row) {
      this.$confirm('赛事发布后，将开放在公众端，是否确认发布?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        publishEvent({ eventId: row.id }).then(res => {
          this.matchs[index].publishStatus = '2'
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发布'
        })       
      })
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该赛事, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEvent({ ids: row.id }).then(res => {
          this.getMatchsByPage()
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })       
      })
    },
    handleSignup (index, row) {
      this.$router.push({ name: 'signupManage', params: { eventId: row.id } })
    },
    handleScore (index, row) {
      this.$router.push({ name: 'scoreManage', params: { eventId: row.id } })
    },
    handleNotice (index, row) {
      this.$router.push({ name: 'noticeManage', params: { eventId: row.id } })
    },
    handleSupport (index, row) {
      this.$router.push({ name: 'supportManage', params: { eventId: row.id } })
    },
    handleAttch (index, row) {
      this.$router.push({ name: 'attchManage', params: { eventId: row.id } })
    },
    // 办赛流程上一步
    prevStep () {
      if (this.currentstep !== 0) {
        this.currentstep--
      }
    },
    // 办赛流程下一步
    nextStep () {
      this.nextLoading = true

      switch (this.currentstep) {
        case 0:
          // 1. 保存基本信息 2. 获取数据字典和赛事组别 3. 步骤+1
          // 验证基本信息的赛事名称必填
          if (this.basicInfoForm.eventName.replace(/(^\s*)|(\s*$)/g, "") === '') {
            this.basicInfoForm.eventName = ''
            this.$message({
              type: 'warning',
              duration: 1000,
              message: '请输入赛事名称'
            })
            this.nextLoading = false
            break
          }

          let formData = new FormData()
          formData = util.objToFormData({ data: this.basicInfoForm })
          addMatchBasicInfo(formData).then(res => {
            this.basicInfoForm.id = res.data.id
            return Promise.all([ getListDicts({ dictionaryName: '参赛单元' }), getListDicts({ dictionaryName: '支持报名' }), getListDicts({ dictionaryName: '收费模式' }), getListEventGroup({ eventId: this.basicInfoForm.id }) ])
          }).then(([res, res1, res2, res3]) => {
            this.participatingTypes = res.data.map(item => item.value)
            this.supportRegistrations = res1.data.map(item => item.value)
            this.chargingModes = res2.data.map(item => item.value)
            // 判断该赛事是否有赛事组别信息
            // res3.data.length > 0 ? this.groupInfos = res3.data : ''
            if (res3.data.length) {
              this.groupInfos = res3.data
              for(let groupInfo of this.groupInfos) {
                groupInfo.supportRegistration = groupInfo.supportRegistration.split(',')
              }
            }
            this.currentstep ++
            this.nextLoading = false
          }).catch(err => {
            this.nextLoading = false
            console.log(err)
          })
          break;
        case 1:
          // 1. 保存组别信息前进行参数的处理 保存后获取id 2. 获取数据字典和所有报名表信息 3. 步骤+1
          let copyGroupInfos = JSON.parse(JSON.stringify(this.groupInfos))
          let copyData = []
          for (let i = 0; i < copyGroupInfos.length; i ++) {
            // 判断组别信息是否有效
            if (copyGroupInfos[i].groupName === '' || copyGroupInfos[i].cost === '' || copyGroupInfos[i].supportRegistration.length === 0) {
              // copyGroupInfos.splice(i, 1)
              continue
            }
            if (Array.isArray(copyGroupInfos[i].supportRegistration)) {
              copyGroupInfos[i].supportRegistration = copyGroupInfos[i].supportRegistration.join(',')
            }
            copyGroupInfos[i].eventsId = this.basicInfoForm.id
            copyGroupInfos[i].sort = i
            copyData.push(copyGroupInfos[i])
          }
          // 必填一个组别信息
          if (copyData.length === 0) {
            this.$message.warning('请完善至少一个组别信息')
            this.nextLoading = false
            break
          }

          addEventGroup(copyData).then(res => {
            // 赋值id
            if (res.data.length > 0) {
              for(let i = 0; i < res.data.length; i ++) {
                this.groupInfos[i].id = res.data[i].id
              }
            }
            return Promise.all([ getListDicts({ dictionaryName: '字段类型' }), getListDicts({ dictionaryName: '字段标识' }), listEventColumn(qs.stringify({ eventId: this.basicInfoForm.id })) ])
          }).then(([res, res1, res2]) => {
            this.columnTypes = res.data.map(item => item.value)
            this.typeIdentifications = res1.data.map(item => item.value)
            // 判断该赛事是否有报名表信息组数据
            res2.data.length > 0 ? this.messageGroup = res2.data : ''
            this.currentstep ++
            this.nextLoading = false
          }).catch(err => {
            this.nextLoading = false
            console.log(err)
          })
          break;
        case 2:
          // 1. 保存信息组，赋值id 2. 获取赛事规章
          let params = []
          for (let i = 0; i < this.messageGroup.length; i ++) {
            // 判断组别是否有效
            if (this.messageGroup[i].groupName === '') {
              continue
            }
            for (let j = 0; j < this.messageGroup[i].columnList.length; j ++) {
              // 判断字段是否有效
              if (this.messageGroup[i].columnList[j].columnName === '') {
                continue
              }
              params.push({
                ...this.messageGroup[i].columnList[j],
                sort: j,
                eventsId: this.basicInfoForm.id,
                groupName: this.messageGroup[i].groupName,
                groupSort: i,
                isParticipating: this.messageGroup[i].isParticipating,
                lowerLimit: this.messageGroup[i].lowerLimit,
                upperLimit: this.messageGroup[i].upperLimit
              })
            }
          }
          // 报名表必填一个，字段必填一个
          if (params.length === 0) {
            this.$message.warning('请完善至少一个报名表以及一个字段')
            this.nextLoading = false
            break
          }

          addEventColumn(params).then(res => {
            // 赋值id
            let index = 0
            if (res.data.length > 0) {
              for (let i = 0; i < this.messageGroup.length; i ++) {
                if (index > res.data.length - 1) { // 数据可能比真是保存的多，超过真实保存就退出
                  break
                }
                for (let j = 0; j < this.messageGroup[i].columnList.length; j ++) {
                  this.messageGroup[i].columnList[j] = res.data[index]
                  index ++
                }
              }
            } 
            return findEventRules(qs.stringify({ eventId: this.basicInfoForm.id }))
          }).then(res => {
            this.matchRule.rules = res.rules === 'null' ? '' : res.rules
            this.currentstep ++
            this.nextLoading = false
          }).catch(err => {
            console.log(err)
            this.nextLoading = false
          })
          break;
        case 3:
          // 1. 保存规章 2. 获取赛事资料
          addEventRules(qs.stringify(Object.assign(this.matchRule, { eventId: this.basicInfoForm.id }))).then(res => {
            return listEventInformation({ eventId: this.basicInfoForm.id })
          }).then(res => {
            // 判断该赛事是否有资料
            res.data.length > 0 ? this.matchAttchs = res.data : ''
            if (res.data.length > 0) {
              for(let matchAttch of this.matchAttchs) {
                matchAttch.file = null
              }
            }
            this.currentstep ++
            this.nextLoading = false
          }).catch(err => {
            console.log(err)
            this.nextLoading = false
          })
          break;
        case 4:
          // 1. 获取数据字典和赛事支持方
          Promise.all(
            [ 
              getListDicts({ dictionaryName: '赛事支持类别' }), 
              listEventSupports({ eventId: this.basicInfoForm.id }) 
            ]
          )
          .then(([res, res1]) => {
            this.matchSupportType = res.data.map(item => item.value)
            // 判断是否有赛事支持方
            res1.data.length > 0 ? this.matchSupports = res1.data : ''
            if (res1.data.length > 0) {
              for(let matchSupport of this.matchSupports) {
                matchSupport.fileUrl = matchSupport.file
              }
            }
            this.currentstep ++
            this.nextLoading = false
          }).catch(err => {
            console.log(err)
            this.nextLoading = false
          })
          break;
        case 5:
          // 1. 保存支持方信息
          for (let i = 0; i < this.matchSupports.length; i ++) {
            this.matchSupports[i].sort = i
            this.matchSupports[i].eventsId = this.basicInfoForm.id
          }
          let isValid = true
          let formDatas1 = new FormData()
          for (let matchSupport of this.matchSupports) {
            // 两个选项都为空，则忽略该条数据
            if (matchSupport.supportName === '' && matchSupport.file === '') {
              continue
            } 
            // 如果有一个为空，则是验证不通过，需要完善
            if (matchSupport.supportName === '' || matchSupport.file === '') {
              isValid = false
              break
            }
            formDatas1.append('id', matchSupport.id)
            formDatas1.append('eventsId', matchSupport.eventsId)
            formDatas1.append('type', matchSupport.type)
            formDatas1.append('supportName', matchSupport.supportName)
            formDatas1.append('sort', matchSupport.sort)
            formDatas1.append('file', matchSupport.file)
          }
          if (isValid) {
            addEventEventSupports(formDatas1).then(res => {
              this.addDialogVisible = false
              this.nextLoading = false
            }).catch(err => {
              console.log(err)
              this.nextLoading = false
            })
          } else {
            this.$message.warning('请完善支持方信息')
            this.nextLoading = false
          }
          break;
      
        default:
          break;
      }
    },
    // logo 上传
    beforeLogoUpload (file) {
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isLt5M) {
        this.$message.error('上传LOGO图片大小不能超过 5MB!');
      } else {
        var windowURL = window.URL || window.webkitURL;
        this.basicInfoForm.eventLogo = windowURL.createObjectURL(file);
        this.basicInfoForm.eventLogoFile = file
      }
      return false;
    },
    // 宣传图上传
    beforePropagandaUpload (file) {
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isLt5M) {
        this.$message.error('上传宣传图大小不能超过 5MB!');
      } else {
        var windowURL = window.URL || window.webkitURL;
        this.basicInfoForm.eventBgImg = windowURL.createObjectURL(file);
        this.basicInfoForm.eventBgImgFile = file
      }
      return false;
    },
    // 开始创建赛事
    startAdd () {
      // 1. 获取数据字典
      getListDicts({ dictionaryName: '赛事种类大项' }).then(res => {
        this.addDialogVisible = true
        this.statementDialogVisible = false
        for(let item of res.data) {
          this.eventTypes1[item.value] = item.id
        }
      }).catch(err => {
        console.log(err)
      })
    },
    addMatch () {
      this.statementDialogVisible = true
    },
    // 创建赛事模态框关闭事件
    addDialogClosed () {
      this.getMatchsByPage()
      // 初始化步骤
      this.currentstep = 0
      this.isEdit = false
      // 1. 初始化基本信息
      this.basicInfoForm = {
        eventName: '',
        parentEventId: 0,
        eventType1: '',
        signUpTimeStart: '',
        signUpTimeEnd: '',
        matchTimeStart: '',
        matchTimeEnd: '',
        province: '',
        city: '',
        district: '',
        address: '',
        adminName: '',
        adminTel: '',
        adminEmail: '',
        chargesType: '平台代收',
        eventLogoFile: '',
        eventBgImgFile: '',
        eventLogo: '',
        eventBgImg: '',
        chargesInfo: '',
        sponsor: '',
      }
      // 2. 组别信息数据
      this.groupInfos = [
        {
          eventsId: '',
          id: 0,
          groupName: '',
          participatingType: '个人',
          cost: '',
          chargingMode: '/人',
          supportRegistration: [],
          isAudit: '是'
        }
      ]
      // 3. 报名表 信息组数据
      this.messageGroup = [
        {
          groupName: '',
          upperLimit: 1,
          lowerLimit: 1,
          isParticipating: '是',
          groupSort: '',
          columnList: [
            {
              id: 0,
              eventsId: '',
              columnName: '',
              columnType: '文本',
              content: '',
              isMandatory: '是',
              typeIdentification: '自定义',
              sort: ''
            }
          ]
        }
      ]
      // 4. 赛事规章
      this.matchRule = {
        eventId: '',
        rules: '<p>赛事规章内容</p>'
      }
      // 5. 赛事资料
      this.matchAttchs = [
        {
          eventsId: '',
          id: 0,
          fileName: '',
          file: ''
        }
      ]
      // 6. 赛事支持
      this.matchSupports = [
        {
          id: 0,
          eventsId: '',
          type: '冠名赞助',
          supportName: '',
          sort: '',
          file: '',
          fileUrl: ''
        }
      ]
    },
    // 搜索赛事
    searchSubmit () {
      this.pageNum = 1
      this.getMatchsByPage()
    },
    basicInfoOnChangeProvince (a) {
      a.value === '省' ? a.value = '' : ''
      this.basicInfoForm.province = a.value
    },
    basicInfoOnChangeCity (a) {
      a.value === '市' ? a.value = '' : ''
      this.basicInfoForm.city = a.value
    },
    basicInfoOnChangeArea (a) {
      a.value === '区' ? a.value = '' : ''
      this.basicInfoForm.district = a.value
    },
    onChangeProvince (a) {
      a.value === '省' ? a.value = '' : ''
      this.formSearch.province = a.value           
    },
    onChangeCity (a) {
      a.value === '市' ? a.value = '' : ''
      this.formSearch.city = a.value               
    },
    onChangeArea (a) {
      a.value === '区' ? a.value = '' : ''
      this.formSearch.district = a.value   
    },
    // 分页组件两个事件
    handleCurrentChange (val) {
      this.pageNum = val
      this.getMatchsByPage()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getMatchsByPage()
    },
    // 查询所有赛事
    getMatchsByPage () {
      let params = {
        pageNum: this.pageNum - 1,
        pageSize: this.pageSize
      }
      this.matchsTableLoading = true
      
      getTotalMatchs(qs.stringify({ pageNum: 0, pageSize: 1000 })).then(res => {
        for (let match of res.data.datas) {
          this.totalMatchs[match.id] = match.parentName
          match.status === '2' ?  this.totalMatchsNoPulish[match.id] = match.parentName : ''
        }
        return getMatchsByPage(qs.stringify({...this.formSearch, ...params}))
      }).then(res => {
        this.matchsTableLoading = false
        this.matchs = res.datas
        for(let match of this.matchs) {
          match.matchTimeEnd === null ? match.matchTimeEnd = '' : ''
          match.matchTimeStart === null ? match.matchTimeStart = '' : ''
          match.signUpTimeEnd === null ? match.signUpTimeEnd = '' : ''
          match.signUpTimeStart === null ? match.signUpTimeStart = '' : ''
        }
        this.total = res.totalNum
      }).catch(err => {
        console.log(err)
        this.matchsTableLoading = false
      })
    },
    // 上升下降
    upAnddown (array, index, type) {
      let temp
      if (type) { // 上升
        temp = array[index - 1]
        this.$set(array, index - 1, array[index])
        this.$set(array, index, temp)
      } else {
        temp = array[index + 1]
        this.$set(array, index + 1, array[index])
        this.$set(array, index, temp)
      }
    }
  },
  watch: {
    'basicInfoForm.eventType1': function (value) {
      if (value && this.eventTypes1[value]) {
        listDictionaryByPid({ pid: this.eventTypes1[value] }).then(res => {
          this.eventTypes2 = res.data.map(item => item.value)
        })
      }
      
    },
    'groupInfos.length': function (value) {
      if (value === 0) {
        this.groupInfos.push({
          eventsId: '',
          id: 0,
          groupName: '',
          participatingType: '个人',
          cost: '',
          chargingMode: '/人',
          supportRegistration: [],
          isAudit: '是'
        })
      }
    },
    'matchAttchs.length': function (value) {
      if (value === 0) {
        this.matchAttchs.push({
          eventsId: '',
          id: 0,
          fileName: '',
          file: ''
        })
      }
    },
    'matchSupports.length': function (value) {
      if (value === 0) {
        this.matchSupports.push({
          id: 0,
          eventsId: '',
          type: '冠名赞助',
          supportName: '',
          sort: '',
          file: '',
          fileUrl: ''
        })
      }
    },
    groupInfos: {
      handler: function (newValue) {
        for(let group of newValue) {
          group.chargingMode === '免费' ? group.cost = '0' : ''
          // group.cost === '0' ? group.chargingMode = '免费' : ''
        }
      },
      deep: true
    },
    messageGroup: {
      handler: function (newValue) {
        for(let messageGroup of newValue) {
          messageGroup.upperLimit - messageGroup.lowerLimit < 0 ? messageGroup.lowerLimit = messageGroup.upperLimit : ''
        }
      },
      deep: true
    }
  },
  computed: {
    formSearchTime: {
      get: function () {
        return [this.formSearch.matchTimeStart, this.formSearch.matchTimeEnd]
      },
      set: function (newValue) {
        if (newValue === null) {
          this.formSearch.matchTimeStart = this.formSearch.matchTimeEnd = undefined
          return 
        }
        this.formSearch.matchTimeStart = util.formatDateTime(newValue[0]) 
        this.formSearch.matchTimeEnd = util.formatDateTime(newValue[1]) 
      }
    },
    basicInfoFormMatchTime: {
      get: function () {
        return [this.basicInfoForm.matchTimeStart || undefined, this.basicInfoForm.matchTimeEnd || undefined]
      },
      set: function (newValue) {
        if (newValue === null) {
          this.basicInfoForm.matchTimeStart = this.basicInfoForm.matchTimeEnd = ''
          return 
        }
        this.basicInfoForm.matchTimeStart = util.formatDateTime(newValue[0]) 
        this.basicInfoForm.matchTimeEnd = util.formatDateTime(newValue[1]) 
      }
    },
    basicInfoFormTime: {
      get: function () {
        return [this.basicInfoForm.signUpTimeStart || undefined, this.basicInfoForm.signUpTimeEnd || undefined]
      },
      set: function (newValue) {
        if (newValue === null) {
          this.basicInfoForm.signUpTimeStart = this.basicInfoForm.signUpTimeEnd = ''
          return 
        }
        this.basicInfoForm.signUpTimeStart = util.formatDateTime(newValue[0]) 
        this.basicInfoForm.signUpTimeEnd = util.formatDateTime(newValue[1]) 
      }
    }
  },
  created () {
    // 获取所有赛事
    this.getMatchsByPage()
    // 获取级别的数据字典
    getListDicts({ dictionaryName: '赛事级别' }).then(res => {
      this.eventLevels = res.data.map(item => item.value)
    })
    getEventPreview({}).then(res => {
      this.previewUrl = res.data
    }).catch(err => {
      console.log(err)
    })
  },
  components: {
    'v-distpicker': VDistpicker,
    'match-steps': matchSteps,
     VueCropper,
  }
}
</script>

<style scoped lang="scss">
.DialogVisible .avatar-uploader {
  display: none;
}
#match-manage {
  height: 100%;
  display: flex;
  flex-direction: column;
  > div {
    padding-left: 30px !important;
  }
  .tb-content {
    flex: 1;
    overflow: scroll;
    overflow-x: hidden;
    padding: 20px;
  }
  .search {
    border-bottom: 1px solid #DCDFE6;
    &after{
      content: '';
      display: table;
      clear: both;
    }
  }
  .toptoolbar {
    padding: 10px 0;
    padding-bottom: 6px;
  }
  .demo-form-inline {
    float: left;
  }
  .bottomtoolbar {
    overflow: hidden;
    padding: 20px;
  }
  .steps-container {
    width: 191px;
    border-right: 1.5px solid #DCDFE6;
    float: left;
    height: 510px;
  }
  .form {
    overflow: hidden;
    .match-attch {
      padding-left: 20px;
      .top {
        margin-bottom: 11px;
      }
    }
    .match-support {
      padding-left: 20px;
      .top {
        margin-bottom: 11px;
      }
    }
    .match-rules {
      .avatar-uploader {
        display: none;
      }
    }
    .signup-wrapper {
      padding-left: 22px;
      .signups {
        height: 465px;
        overflow: scroll;
        overflow-x: hidden;
        margin-top: 11px;
      }
      .signup {
        margin-bottom: 11px;
        border: 1px solid #dddddd;
      } 
      padding-bottom: 15px;
      .header {
        line-height: 38px;
        height: 38px;
        padding:0 10px;
        overflow: hidden;
        background: #e9f6fd;
        border-bottom: 1px solid #dddddd;
        .handle {
          float: right;
        }
      }
    }
  }
}
</style>
